import fitz

pdf_path = "data/raw/GrantofLicence-Guidelines-25Feb2026.pdf"
output_path = "data/processed/documents.txt"

doc = fitz.open(pdf_path)

with open(output_path, "w", encoding="utf-8") as f:

    for page_number, page in enumerate(doc, start=1):

        text = page.get_text().strip()

        if text:
            f.write(f"\n--- PAGE {page_number} ---\n")
            f.write(text)
            f.write("\n")

doc.close()

print("Text extraction completed!")
print(f"Saved to: {output_path}")