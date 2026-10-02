## 🧠 RAG Pipeline

BIS Sahayak AI follows a Retrieval-Augmented Generation (RAG) architecture:

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
| Programming Languages | Python, JavaScript |
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

### 1. Clone the Repository

```bash
git clone https://github.com/vichu2k7/bis-ai-assistant.git
cd bis-ai-assistant

2. Install Python Dependencies
pip install -r requirements.txt

3. Start Ollama
Make sure Ollama is installed and running.
Pull the required Llama model:
ollama pull llama3.2:3b

4. Start the Backend
From the project root:
python -m uvicorn backend.main:app --reload

The FastAPI backend will start locally.
5. Start the Frontend
Open a new terminal:
cd frontend
npm install
npm run dev

The frontend will be available at:
http://localhost:5173/

6. Open the Application
Open the URL shown by Vite in your browser:
http://localhost:5173/

🎥 Demo
Watch the complete BIS Sahayak AI demonstration:
YouTube Demo:
https://youtu.be/AEbf1ZiBF_g?si=uy9gqqQH4BCyLo5G
🔐 Grounding & Safety
BIS Sahayak AI is designed to reduce unsupported responses by grounding generation in retrieved BIS documents.
If relevant information cannot be found in the available knowledge base, the system can indicate that the information is unavailable rather than intentionally generating an unsupported BIS answer.
The current implementation is an MVP and should not be treated as a replacement for official BIS legal, regulatory, or certification guidance.
⚠️ Current Limitations
- The MVP uses a curated BIS document collection rather than the complete BIS knowledge ecosystem.
- English conversational interaction is currently supported.
- Production deployment would require stronger authentication, authorization, monitoring, encryption, and controlled document-update mechanisms.
- The current knowledge base requires controlled re-ingestion when documents are updated.
🔮 Future Scope
The architecture can be extended with:
- Automated BIS document monitoring
- Document version control
- Change detection and re-indexing
- Role-based access control
- Multilingual interaction
- Expanded BIS knowledge sources
- Clause-level citations
- Secure production deployment
- Knowledge-gap detection and official-source fallback
🏆 Project Status
BIS Sahayak AI — Hackathon MVP
The current version demonstrates a complete end-to-end RAG workflow:
BIS Documents
      ↓
Document Processing
      ↓
Text Chunking
      ↓
Embeddings
      ↓
ChromaDB
      ↓
Semantic Retrieval
      ↓
Llama 3.2 3B
      ↓
Grounded BIS Answer
      ↓
Source References

The MVP provides a foundation for a future production-grade BIS intelligence platform.
🔗 Project Links
GitHub Repository:
https://github.com/vichu2k7/bis-ai-assistant
YouTube Demo:
https://youtu.be/AEbf1ZiBF_g?si=uy9gqqQH4BCyLo5G