import chromadb
from sentence_transformers import SentenceTransformer
import requests


# --------------------------------
# 1. Load embedding model
# --------------------------------

print("Loading embedding model...")

embedding_model = SentenceTransformer(
    "all-MiniLM-L6-v2",
    local_files_only=True
)


# --------------------------------
# 2. Connect to ChromaDB
# --------------------------------

client = chromadb.PersistentClient(
    path="data/chroma"
)


# --------------------------------
# 3. Get BIS collection
# --------------------------------

collection = client.get_collection(
    "bis_documents"
)


# --------------------------------
# 4. Configuration
# --------------------------------

OLLAMA_URL = (
    "http://localhost:11434/api/generate"
)

OLLAMA_MODEL = "llama3.2:3b"

TOP_K = 10

THRESHOLD = 1.30


# --------------------------------
# 5. RAG function
# --------------------------------

def ask_bis(question: str):

    # --------------------------------
    # Convert question to embedding
    # --------------------------------

    query_embedding = embedding_model.encode(
        question
    ).tolist()


    # --------------------------------
    # Search ChromaDB
    # --------------------------------

    results = collection.query(

        query_embeddings=[
            query_embedding
        ],

        n_results=TOP_K,

        include=[
            "documents",
            "metadatas",
            "distances"
        ]
    )


    # --------------------------------
    # Get retrieved data
    # --------------------------------

    documents = results["documents"][0]

    metadata = results["metadatas"][0]

    distances = results["distances"][0]


    print("\nDistances:", distances)


    # --------------------------------
    # Filter relevant chunks
    # --------------------------------

    relevant_documents = []

    relevant_metadata = []


    for document, item, distance in zip(
        documents,
        metadata,
        distances
    ):

        print(
            f"Distance: {distance:.4f} | "
            f"Chunk: {item.get('chunk_id', 'Unknown')}"
        )


        if distance <= THRESHOLD:

            relevant_documents.append(
                document
            )

            relevant_metadata.append(
                item
            )


    # --------------------------------
    # No relevant information
    # --------------------------------

    if not relevant_documents:

        return {
            "answer": (
                "I could not find this information "
                "in the available BIS documents."
            ),
            "sources": []
        }


    # --------------------------------
    # Create context
    # --------------------------------

    context_parts = []
    


    for i, document in enumerate(
        relevant_documents,
        start=1
    ):

        context_parts.append(
            f"""
--- BIS DOCUMENT {i} ---
{document}
"""
        )


    context = "\n".join(
        context_parts
    )


    # --------------------------------
    # Create grounded prompt
    # --------------------------------

    prompt = f"""
You are BIS Sahayak AI.

You answer questions using ONLY
the provided BIS document context.

STRICT RULES:

1. Use ONLY the provided BIS context.

2. Do NOT use outside knowledge.

3. Do NOT guess or invent information.

4. If the answer is not present in the
provided context, respond exactly:

I could not find this information in the available BIS documents.

5. Give a clear and concise answer.

6. Answer only what the user asked.

7. Do not mention unrelated information.

8. Do not refer to yourself as a language model.

BIS DOCUMENT CONTEXT:

{context}

USER QUESTION:

{question}

ANSWER:
"""


    # --------------------------------
    # Send to Ollama
    # --------------------------------

    try:

        response = requests.post(

            OLLAMA_URL,

            json={
                "model": OLLAMA_MODEL,
                "prompt": prompt,
                "stream": False
            },

            timeout=120
        )

    except requests.RequestException as e:

        print(
            "Ollama connection error:",
            e
        )

        return {
            "answer": (
                "Could not connect to the "
                "BIS AI server."
            ),
            "sources": [],
            "error": str(e)
        }


    # --------------------------------
    # Check response
    # --------------------------------

    if response.status_code != 200:

        print(
            "Ollama error:",
            response.text
        )

        return {
            "answer": (
                "The BIS AI server returned "
                "an error."
            ),
            "sources": [],
            "error": response.text
        }


    # --------------------------------
    # Extract answer
    # --------------------------------

    try:

        data = response.json()

        answer = data["response"].strip()

    except (ValueError, KeyError):

        return {
            "answer": (
                "Invalid response received "
                "from the BIS AI server."
            ),
            "sources": []
        }


    # --------------------------------
    # Prepare sources
    # --------------------------------

    sources = []

    seen_sources = set()


    for item in relevant_metadata:

        source_name = item.get(
            "source",
            "Unknown"
        )

        page = item.get(
            "page",
            "Unknown"
        )

        chunk_id = item.get(
            "chunk_id",
            "Unknown"
        )


        source_key = (
            source_name,
            page,
            chunk_id
        )


        # Avoid duplicate sources

        if source_key in seen_sources:

            continue


        seen_sources.add(
            source_key
        )


        sources.append({

            "source": source_name,

            "page": page,

            "chunk": chunk_id

        })


    # --------------------------------
    # Return final result
    # --------------------------------

    return {

        "answer": answer,

        "sources": sources

    }