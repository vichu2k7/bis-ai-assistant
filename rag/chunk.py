import fitz
from pathlib import Path
import re


# --------------------------------
# 1. Paths
# --------------------------------

raw_dir = Path("data/raw")

pdf_files = list(raw_dir.glob("*.pdf"))

output_path = Path(
    "data/processed/chunks.txt"
)


# --------------------------------
# 2. Chunk configuration
# --------------------------------

CHUNK_SIZE = 1000
CHUNK_OVERLAP = 150


# --------------------------------
# 3. Create output directory
# --------------------------------

output_path.parent.mkdir(
    parents=True,
    exist_ok=True
)


# --------------------------------
# 4. Clean extracted PDF text
# --------------------------------

def clean_text(text):

    # Remove unusual zero-width characters
    text = text.replace("\u200b", " ")
    text = text.replace("\u200c", " ")
    text = text.replace("\u200d", " ")
    text = text.replace("\ufeff", " ")

    # Fix repeated whitespace
    text = re.sub(r"\s+", " ", text)

    # Remove spaces before punctuation
    text = re.sub(r"\s+([,.!?;:])", r"\1", text)

    return text.strip()


# --------------------------------
# 5. Prepare chunks
# --------------------------------

chunks = []

chunk_number = 0


# --------------------------------
# 6. Process each PDF
# --------------------------------

for pdf_path in pdf_files:

    print(f"Processing: {pdf_path.name}")

    doc = fitz.open(pdf_path)


    # --------------------------------
    # 7. Process each page
    # --------------------------------

    for page_number, page in enumerate(doc, start=1):

        text = page.get_text()

        text = clean_text(text)

        if not text:
            continue


        # --------------------------------
        # 8. Split page into sentences
        # --------------------------------

        sentences = re.split(
            r"(?<=[.!?])\s+",
            text
        )


        current_chunk = ""


        for sentence in sentences:

            sentence = sentence.strip()

            if not sentence:
                continue


            # --------------------------------
            # Add sentence to current chunk
            # --------------------------------

            if (
                len(current_chunk) + len(sentence) + 1
                <= CHUNK_SIZE
            ):

                if current_chunk:

                    current_chunk += " "

                current_chunk += sentence


            else:

                # Save current chunk
                if current_chunk:

                    chunk_number += 1

                    chunks.append({
                        "chunk_id": f"chunk_{chunk_number}",
                        "source": pdf_path.name,
                        "page": page_number,
                        "text": current_chunk
                    })


                # --------------------------------
                # Create overlap
                # --------------------------------

                overlap_text = current_chunk[
                    -CHUNK_OVERLAP:
                ]

                current_chunk = (
                    overlap_text + " " + sentence
                ).strip()


        # --------------------------------
        # Save remaining text from page
        # --------------------------------

        if current_chunk:

            chunk_number += 1

            chunks.append({
                "chunk_id": f"chunk_{chunk_number}",
                "source": pdf_path.name,
                "page": page_number,
                "text": current_chunk
            })


    # --------------------------------
    # Close current PDF
    # --------------------------------

    doc.close()


# --------------------------------
# 9. Save chunks
# --------------------------------

with output_path.open(
    "w",
    encoding="utf-8"
) as f:

    for chunk in chunks:

        f.write(
            f"--- CHUNK {chunk['chunk_id']} ---\n"
        )

        f.write(
            f"SOURCE: {chunk['source']}\n"
        )

        f.write(
            f"PAGE: {chunk['page']}\n"
        )

        f.write(
            chunk["text"]
        )

        f.write("\n\n")


# --------------------------------
# 10. Result
# --------------------------------

print("\nChunking completed!")

print(
    f"Created {len(chunks)} chunks."
)

print(
    f"Processed {len(pdf_files)} PDF files."
)

print(
    f"Saved to: {output_path}"
)