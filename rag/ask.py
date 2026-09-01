import chromadb
from sentence_transformers import SentenceTransformer
import requests

# 1. Load embedding model
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

# 2. Connect to ChromaDB
client = chromadb.PersistentClient(path="data/chroma")

# 3. Get the collection
collection = client.get_collection("bis_documents")

# 4. Ask the user
question = input("Ask a BIS question: ")

# 5. Convert question into embedding
query_embedding = embedding_model.encode(question).tolist()

# 6. Search ChromaDB
results = collection.query(
    query_embeddings=[query_embedding],
    n_results=5,
    include=["documents", "metadatas", "distances"]
)

# Show similarity distances
print("Distances:", results["distances"][0])

# 7. Get retrieved information
documents = results["documents"][0]
metadata = results["metadatas"][0]

# 8. Check whether the retrieved information is relevant
best_distance = results["distances"][0][0]

THRESHOLD = 1.20

if best_distance > THRESHOLD:
    print("\n--- BIS Sahayak AI ---")
    print("I could not find this information in the available BIS documents.")

    print("\n--- Sources ---")
    print("No relevant BIS document found.")

    exit()

# 9. Create context for Llama
context = "\n\n".join(documents)

# 10. Create prompt for Llama
prompt = f"""
You are BIS Sahayak AI, an assistant that answers questions using
Bureau of Indian Standards documents.

Answer the user's question using ONLY the provided BIS context.

If the answer is not present in the context, say:
"I could not find this information in the available BIS documents."

BIS Context:
{context}

User Question:
{question}

Answer clearly and simply:
"""

# 11. Send context + question to Ollama
response = requests.post(
    "http://localhost:11434/api/generate",
    json={
        "model": "llama3.2:3b",
        "prompt": prompt,
        "stream": False
    }
)

# 12. Display answer
if response.status_code == 200:

    answer = response.json()["response"]

    print("\n--- BIS Sahayak AI ---")
    print(answer)

    print("\n--- Sources ---")

    for i, item in enumerate(metadata, start=1):
        print(f"{i}. {item['source']}")
        print(f"   Page: {item['page']}")
        print(f"   Chunk: {item['chunk_id']}")

else:
    print("Ollama error:", response.text)