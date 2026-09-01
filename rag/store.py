import chromadb
from sentence_transformers import SentenceTransformer


# --------------------------------
# 1. Load embedding model
# --------------------------------

print("Loading embedding model...")

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


# --------------------------------
# 2. Connect to ChromaDB
# --------------------------------

client = chromadb.PersistentClient(
    path="data/chroma"
)


# --------------------------------
# 3. Create fresh collection
# --------------------------------

try:

    client.delete_collection(
        name="bis_documents"
    )

    print("Old ChromaDB collection deleted.")

except Exception:

    print("No existing collection found.")


collection = client.create_collection(
    name="bis_documents"
)


# --------------------------------
# 4. Read chunks
# --------------------------------

with open(
    "data/processed/chunks.txt",
    "r",
    encoding="utf-8"
) as f:

    text = f.read()


# --------------------------------
# 5. Parse chunks
# --------------------------------

raw_chunks = text.split("--- CHUNK ")

chunks = []

for raw_chunk in raw_chunks:

    raw_chunk = raw_chunk.strip()

    if not raw_chunk:
        continue

    lines = raw_chunk.splitlines()


    # --------------------------------
    # Chunk ID
    # --------------------------------

    chunk_id = (
        lines[0]
        .replace("---", "")
        .strip()
    )


    # --------------------------------
    # Source
    # --------------------------------

    source_line = lines[1].strip()

    source = (
        source_line
        .replace("SOURCE:", "")
        .strip()
    )


    # --------------------------------
    # Page
    # --------------------------------

    page_line = lines[2].strip()

    page = int(
        page_line
        .replace("PAGE:", "")
        .strip()
    )


    # --------------------------------
    # Document text
    # --------------------------------

    document = "\n".join(
        lines[3:]
    ).strip()


    chunks.append({

        "chunk_id": chunk_id,

        "source": source,

        "page": page,

        "text": document
    })


print(
    f"Loaded {len(chunks)} chunks."
)


# --------------------------------
# 6. Create embeddings
# --------------------------------

documents = [

    chunk["text"]

    for chunk in chunks

]


embeddings = model.encode(

    documents,

    show_progress_bar=True

).tolist()


# --------------------------------
# 7. Create metadata
# --------------------------------

metadatas = []

for chunk in chunks:

    metadatas.append({

        "source": chunk["source"],

        "page": chunk["page"],

        "chunk_id": chunk["chunk_id"]

    })


# --------------------------------
# 8. Store in ChromaDB
# --------------------------------

collection.upsert(

    ids=[

        chunk["chunk_id"]

        for chunk in chunks

    ],

    documents=documents,

    embeddings=embeddings,

    metadatas=metadatas

)


# --------------------------------
# 9. Done
# --------------------------------

print(
    f"Stored {len(chunks)} chunks in ChromaDB."
)

print(
    "Source and page metadata stored successfully."
)