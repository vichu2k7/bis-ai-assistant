---

## 🧠 RAG Pipeline

BIS Sahayak AI follows a Retrieval-Augmented Generation architecture:

1. **Document Processing**  
   BIS PDF documents are collected and processed using PyMuPDF.

2. **Text Chunking**  
   Documents are divided into smaller overlapping chunks for efficient retrieval.

3. **Embedding Generation**  
   Each chunk is converted into a vector representation using Sentence Transformers.

4. **Vector Storage**  
   Embeddings are stored in ChromaDB along with document metadata such as source, page, year, and document type.

5. **Semantic Retrieval**  
   When a user asks a question, the question is converted into an embedding and relevant BIS chunks are retrieved using semantic similarity.

6. **Context Construction**  
   The retrieved information is combined into a context for the language model.

7. **Grounded Generation**  
   Llama 3.2 3B generates an answer using the retrieved BIS context.

8. **Source Traceability**  
   The system returns relevant document and page references along with the answer.

---

## 🛠️ Technology Stack

| Component | Technology |
|---|---|
| Frontend | React + Vite |
| Backend | FastAPI |
| RAG | Retrieval-Augmented Generation |
| Embeddings | Sentence Transformers (`all-MiniLM-L6-v2`) |
| Vector Database | ChromaDB |
| LLM | Llama 3.2 3B |
| Local LLM Runtime | Ollama |
| PDF Processing | PyMuPDF |
| Language | Python, JavaScript |
| Version Control | Git + GitHub |

---

## 📚 Knowledge Base

The MVP uses a curated collection of official BIS documents covering areas such as:

- BIS Act
- BIS Rules
- Conformity Assessment Regulations
- Conformity Assessment amendments and corrigenda
- Removal of Difficulty Order
- Hallmarking-related regulations
- Grant of Licence Guidelines

The knowledge base currently contains **1,434 processed chunks across 9 BIS PDF documents**.

---

## ✨ Key Features

- 💬 Natural-language BIS question answering
- 🔎 Semantic document retrieval
- 📚 BIS-focused knowledge base
- 🧠 Retrieval-Augmented Generation
- 📄 Source and page references
- 📅 Document year and type metadata
- 🛡️ Grounded responses based on retrieved BIS content
- 🚫 Fallback when information is unavailable in the knowledge base
- ⚡ Local LLM inference using Ollama

---

## 🏗️ System Architecture

```text
                BIS Documents
                     ↓
              PDF Processing
                     ↓
                 Chunking
                     ↓
          Sentence Transformers
                     ↓
                Embeddings
                     ↓
                 ChromaDB
                     ↑
                     │
              User Question
                     ↓
             Query Embedding
                     ↓
            Semantic Retrieval
                     ↓
          Relevant BIS Chunks
                     ↓
             Context Builder
                     ↓
              Llama 3.2 3B
                     ↓
            Grounded Response
                     ↓
          Source / Page References
                     ↓
                React UI