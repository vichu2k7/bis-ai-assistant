from rag.rag_pipeline import ask


# --------------------------------
# Test questions
# --------------------------------

questions = [

    "What are the powers and functions of the Bureau?",

    "What is Grant of Licence?",

    "What documents are required to apply for BIS Grant of Licence?",

    "How is the Bureau of Indian Standards established?",

    "What is the salary of the BIS Chairman?"
]


# --------------------------------
# Run evaluation
# --------------------------------

for number, question in enumerate(
    questions,
    start=1
):

    print("\n")
    print("=" * 70)

    print(f"TEST {number}")

    print("=" * 70)

    print(f"\nQuestion:\n{question}")


    # Run RAG
    answer, results = ask(
        question,
        k=5
    )


    # --------------------------------
    # Display answer
    # --------------------------------

    print("\nAnswer:")

    print(answer)


    # --------------------------------
    # Display retrieved sources
    # --------------------------------

    print("\nRetrieved Sources:")

    for metadata in results["metadatas"][0]:

        print(
            f"- "
            f"{metadata.get('source', 'Unknown')} "
            f"| Page "
            f"{metadata.get('page', 'Unknown')} "
            f"| Chunk "
            f"{metadata.get('chunk_id', 'Unknown')}"
        )


    print("\n" + "=" * 70)