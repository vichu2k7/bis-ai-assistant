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
# 3. Detect document focus
# --------------------------------

def detect_document_focus(question):

    q = question.lower()

    if "bis act" in q:

        return [
            "BIS Act",
            "BIS-ACT-2016.pdf"
        ]

    if (
        "hallmark" in q
        or "hallmarking" in q
    ):

        return [
            "Hallmarking",
            "Hallmarking Amendment",
            "precious metal"
        ]

    if (
        "conformity assessment" in q
        or "conformity" in q
    ):

        return [
            "Conformity Assessment",
            "Conformity Assessment Amendment",
            "Conformity Assessment Corrigendum",
            "Grant of Licence Guidelines"
        ]

    if "rules" in q:

        return [
            "BIS Rules"
        ]

    if "licence" in q or "license" in q:

        return [
            "Grant of Licence Guidelines",
            "Conformity Assessment"
        ]

    return []


# --------------------------------
# 4. Retrieve relevant chunks
# --------------------------------

def retrieve(question, k=5):

    question = question.strip()

    original_question = question.lower()


    # --------------------------------
    # BIS normalization
    # --------------------------------

    if original_question in [
        "what is bis?",
        "what is bis",
        "tell me about bis",
        "what does bis mean?",
        "what does bis mean"
    ]:

        question = (
            "What is the Bureau of Indian Standards?"
        )


    # --------------------------------
    # Create embedding
    # --------------------------------

    question_embedding = model.encode(
        question
    ).tolist()


    # --------------------------------
    # Retrieve large candidate pool
    # --------------------------------

    candidate_count = max(
        k * 20,
        100
    )


    results = collection.query(

        query_embeddings=[
            question_embedding
        ],

        n_results=candidate_count,

        include=[
            "documents",
            "metadatas",
            "distances"
        ]
    )


    documents = results["documents"][0]

    metadatas = results["metadatas"][0]

    distances = results["distances"][0]


    # --------------------------------
    # Detect document focus
    # --------------------------------

    focus_terms = detect_document_focus(
        original_question
    )


    # --------------------------------
    # Detect recency request
    # --------------------------------

    recency_keywords = [
        "latest",
        "current",
        "newest",
        "recent",
        "recently",
        "updated",
        "update",
        "new",
        "2026",
        "2025",
        "2024"
    ]

    wants_latest = any(
        keyword in original_question
        for keyword in recency_keywords
    )


    # --------------------------------
    # Score candidates
    # --------------------------------

    candidates = []


    for document, metadata, distance in zip(
        documents,
        metadatas,
        distances
    ):

        source = str(
            metadata.get(
                "source",
                ""
            )
        ).lower()

        document_type = str(
            metadata.get(
                "type",
                ""
            )
        ).lower()

        year = metadata.get(
            "year",
            0
        )


        score = distance


        # --------------------------------
        # Document focus boost
        # --------------------------------

        if focus_terms:

            for term in focus_terms:

                term = term.lower()

                if (
                    term in source
                    or term in document_type
                ):

                    score -= 0.35

                    break


        # --------------------------------
        # Recency boost
        # --------------------------------

        if wants_latest:

            recency_boost = (
                max(year - 2018, 0)
                * 0.025
            )

            score -= recency_boost


        candidates.append({

            "document": document,

            "metadata": metadata,

            "distance": distance,

            "score": score

        })


    # --------------------------------
    # Sort candidates
    # --------------------------------

    candidates.sort(
        key=lambda x: x["score"]
    )


    # --------------------------------
    # Select top results
    # --------------------------------

    selected = candidates[:k]


    return {

        "documents": [[
            item["document"]
            for item in selected
        ]],

        "metadatas": [[
            item["metadata"]
            for item in selected
        ]],

        "distances": [[
            item["distance"]
            for item in selected
        ]]

    }