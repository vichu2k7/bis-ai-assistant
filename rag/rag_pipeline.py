from .retrieve import retrieve
from .generate import generate_answer


# --------------------------------
# 1. Filter relevant chunks
# --------------------------------

def filter_results(results, max_distance=0.95):

    documents = results["documents"][0]
    metadatas = results["metadatas"][0]
    distances = results["distances"][0]

    filtered_documents = []
    filtered_metadatas = []
    filtered_distances = []

    for document, metadata, distance in zip(
        documents,
        metadatas,
        distances
    ):

        if distance <= max_distance:

            filtered_documents.append(document)
            filtered_metadatas.append(metadata)
            filtered_distances.append(distance)

    return {
        "documents": [filtered_documents],
        "metadatas": [filtered_metadatas],
        "distances": [filtered_distances]
    }


# --------------------------------
# 2. Build context
# --------------------------------

def build_context(results):

    documents = results["documents"][0]
    metadatas = results["metadatas"][0]

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

    return "\n\n".join(context_parts)


# --------------------------------
# 3. Create RAG prompt
# --------------------------------

def create_prompt(question, context):

    prompt = f"""
You are a BIS (Bureau of Indian Standards) AI assistant.

Answer the user's question using ONLY the information
provided in the context below.

Do not use your general knowledge.

Do not invent facts, dates, requirements, sections,
or procedures.

If the context does not contain enough information,
say:

"I could not find enough information in the provided
BIS documents."

Keep the answer clear and easy to understand.

When possible, mention the source document and page
number supporting the answer.

---------------- CONTEXT ----------------

{context}

-------------- END CONTEXT --------------

USER QUESTION:

{question}

ANSWER:
"""

    return prompt


# --------------------------------
# 4. Complete RAG pipeline
# --------------------------------

def ask(question, k=5):

    # Retrieve chunks
    retrieved_results = retrieve(
        question,
        k=k
    )


    # Filter irrelevant chunks
    filtered_results = filter_results(
        retrieved_results,
        max_distance=0.95
    )


    # Check whether useful chunks remain
    if not filtered_results["documents"][0]:

        return (
            "I could not find enough information "
            "in the provided BIS documents.",
            filtered_results
        )


    # Build context
    context = build_context(
        filtered_results
    )


    # Create prompt
    prompt = create_prompt(
        question,
        context
    )


    # Generate answer
    answer = generate_answer(
        prompt
    )


    return answer, filtered_results


# --------------------------------
# 5. Test RAG
# --------------------------------


# --------------------------------
# 6. Display final answer
# --------------------------------

print("\n")
print("=" * 70)

print("QUESTION")

print("=" * 70)

print(question)


print("\n")
print("=" * 70)

print("FINAL RAG ANSWER")

print("=" * 70)

print(answer)


print("\n")
print("=" * 70)

print("SOURCES PASSED TO LLM")

print("=" * 70)


for metadata in results["metadatas"][0]:

    print(
        f"- {metadata.get('source', 'Unknown')} "
        f"(Page {metadata.get('page', 'Unknown')}, "
        f"Chunk {metadata.get('chunk_id', 'Unknown')})"
    )


print("=" * 70)