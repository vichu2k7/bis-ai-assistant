from retrieve import retrieve


# --------------------------------
# 1. Build context
# --------------------------------

def build_context(question, k=5):

    # Retrieve relevant chunks
    results = retrieve(
        question,
        k=k
    )

    documents = results["documents"][0]

    metadatas = results["metadatas"][0]


    # --------------------------------
    # 2. Prepare context sections
    # --------------------------------

    context_parts = []


    for document, metadata in zip(
        documents,
        metadatas
    ):

        source = metadata.get(
            "source",
            "Unknown"
        )

        page = metadata.get(
            "page",
            "Unknown"
        )

        chunk_id = metadata.get(
            "chunk_id",
            "Unknown"
        )


        section = f"""
SOURCE: {source}
PAGE: {page}
CHUNK: {chunk_id}

{document}
"""


        context_parts.append(
            section.strip()
        )


    # --------------------------------
    # 3. Combine all chunks
    # --------------------------------

    context = "\n\n".join(
        context_parts
    )


    return context


# --------------------------------
# 4. Test context building
# --------------------------------

question = (
    "What are the powers and functions "
    "of the Bureau?"
)


context = build_context(
    question,
    k=5
)


print("\n")
print("=" * 70)
print("GENERATED CONTEXT")
print("=" * 70)

print(context)

print("=" * 70)