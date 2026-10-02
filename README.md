# 🇮🇳 BIS Sahayak AI

## AI-Powered Knowledge Assistant for the Bureau of Indian Standards

BIS Sahayak AI is a domain-specific AI assistant designed to help citizens, manufacturers, MSMEs, students, and businesses access BIS-related information through a simple conversational interface.

The system uses **Retrieval-Augmented Generation (RAG)** to retrieve relevant information from a curated BIS document knowledge base and generate grounded answers using a local Large Language Model.

---

## 🎯 Problem Statement

Finding information related to Indian Standards, certification, licensing, regulations, and BIS procedures can be difficult because users often need to search through lengthy and technical documents.

Users may need to:

- Search through large PDF documents
- Understand technical terminology
- Find relevant sections and clauses
- Identify certification requirements
- Understand BIS licensing procedures
- Cross-check information across documents

Traditional keyword search may also fail when users describe their questions differently from the terminology used in official documents.

BIS Sahayak AI addresses this problem through semantic retrieval and AI-powered question answering.

---

## 💡 Proposed Solution

BIS Sahayak AI allows users to ask questions about BIS information using natural language.

The system retrieves relevant information from BIS documents before generating the answer.

### Core Workflow

```text
User Question
      ↓
Question Embedding
      ↓
Semantic Search
      ↓
ChromaDB
      ↓
Relevant BIS Document Chunks
      ↓
Context Construction
      ↓
Llama 3.2 3B
      ↓
Grounded Answer
      ↓
Source References