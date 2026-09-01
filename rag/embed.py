from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")

text = "BIS certification is required for certain products."

embedding = model.encode(text)

print("Embedding created!")
print("Number of values:", len(embedding))
print("First 5 values:", embedding[:5])