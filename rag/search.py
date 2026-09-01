import chromadb
from sentence_transformers import SentenceTransformer


# --------------------------------
# 1. Load embedding model
# --------------------------------

print("Loading embedding model...")

model = SentenceTransformer(
    "all-MiniLM-L6-v2",
    local_files_only=True
)


# --------------------------------
# 2. Connect to ChromaDB
# --------------------------------

client = chromadb.PersistentClient(
    path="data/chroma"
)

collection = client.get_collection(
    "bis_documents"
)


# --------------------------------
# 3. Questions to test
# --------------------------------

questions = [

    "According to the BIS Act 2016, what are the powers and functions of the Bureau?",

    "According to the BIS Act 2016, how is the Bureau of Indian Standards established?",

    "According to the BIS Act 2016, what is the role of the Governing Council?",

    "What is Grant of Licence?",

    "What documents are required to apply for BIS Grant of Licence?"

]


# --------------------------------
# 4. Search each question
# --------------------------------

for question in questions:

    print("\n")
    print("=" * 70)
    print(f"QUESTION: {question}")
    print("=" * 70)


    # --------------------------------
    # Convert question to embedding
    # --------------------------------

    question_embedding = model.encode(
        question
    ).tolist()


    # --------------------------------
    # Search ChromaDB
    # --------------------------------

    results = collection.query(

        query_embeddings=[
            question_embedding
        ],

        n_results=5,

        include=[
            "documents",
            "metadatas",
            "distances"
        ]
    )


    documents = results["documents"][0]

    metadata = results["metadatas"][0]

    distances = results["distances"][0]


    # --------------------------------
    # 5. Display top results
    # --------------------------------

    for i, (
        document,
        item,
        distance
    ) in enumerate(
        zip(
            documents,
            metadata,
            distances
        ),
        start=1
    ):

        print("\n" + "-" * 60)

        print(f"RESULT {i}")

        print(
            f"Distance : {distance:.4f}"
        )

        print(
            f"Source   : "
            f"{item.get('source', 'Unknown')}"
        )

        print(
            f"Page     : "
            f"{item.get('page', 'Unknown')}"
        )

        print(
            f"Chunk    : "
            f"{item.get('chunk_id', 'Unknown')}"
        )

        print("\nContent:")

        print(
            document[:500]
        )

        print("-" * 60)