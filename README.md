# BIS Sahayak AI 🇮🇳

> AI-powered, source-grounded assistant for navigating Bureau of Indian Standards (BIS) information.

## 📌 Overview

**BIS Sahayak AI** is an AI-powered knowledge assistant designed to help citizens, students, manufacturers, and businesses find information from official BIS documents more easily.

Instead of manually searching through lengthy BIS documents, users can ask questions in natural language. The system retrieves relevant information from the BIS knowledge base and generates an answer using the retrieved official document context.

The system follows a **Retrieval-Augmented Generation (RAG)** architecture to reduce unsupported answers and provide document-level source references.

---

## 🎯 Problem

BIS information is distributed across regulations, standards-related documents, certification guidelines, and other official resources.

Users may face difficulties such as:

- Manually searching lengthy PDF documents
- Finding the relevant section or information
- Understanding technical BIS terminology
- Identifying the correct certification or licensing procedure
- Connecting a question with the relevant official document

BIS Sahayak AI aims to make this information easier to access through a simple conversational interface.

---

## 💡 Proposed Solution

BIS Sahayak AI combines:

- Natural-language question answering
- Semantic document retrieval
- Vector search
- Retrieval-Augmented Generation
- Local Large Language Model
- Source/document references
- A web-based user interface

### Basic Workflow

```text
User Question
      ↓
Question Embedding
      ↓
Semantic Retrieval
      ↓
ChromaDB
      ↓
Relevant BIS Document Chunks
      ↓
Context Construction
      ↓
Llama 3.2
      ↓
Grounded Answer
      ↓
Source References
