import chromadb
from sentence_transformers import SentenceTransformer


# --------------------------------
# 1. Load embedding model
# --------------------------------

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
# 3. Retrieve relevant chunks
# --------------------------------

def retrieve(question, k=5):

    question_embedding = model.encode(
        question
    ).tolist()

    results = collection.query(

        query_embeddings=[
            question_embedding
        ],

        n_results=k,

        include=[
            "documents",
            "metadatas",
            "distances"
        ]
    )

    return results