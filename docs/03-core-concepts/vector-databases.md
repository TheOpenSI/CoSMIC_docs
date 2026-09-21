---
id: core-concepts-vector-databases
title: Vector Databases
sidebar_label: Vector Databases
sidebar_position: 5
---

**Want CoSMIC to use your own documents?**

The vector database is CoSMIC's long-term knowledge store. Documents and text are converted into numerical vectors (embeddings), which lets the system retrieve relevant information by meaning rather than exact keyword matching — this is what powers RAG.

## Embedding Model

Vector storage uses its own embedding model, separate from the main LLM or query analyser:

| Model Name | Hugging Face Repository |
|---|---|
| gte-small | thenlper/gte-small |

## Storage

The database is backed by Qdrant, running as its own container, rather than a local on-disk database. Qdrant handles saving and persistence itself — there's no separate save step, and no local database file to manage. Vectors are compared using cosine similarity.

Content isn't stored in one single collection per deployment. CoSMIC keeps three separate layers: content scoped to the current conversation, content scoped to a specific user, and content shared globally across a service. Each layer is kept separate and searched according to what's relevant to the current request. See [Retrieval-Augmented Generation](./rag.md) for how these layers are used together.

**Note:** Physically, this is one Qdrant collection. The three layers — conversation, user, and global — aren't separate databases; they're logical scopes applied through metadata filters within that one collection.

## Chunking

Large documents are split into smaller, overlapping chunks before being stored (1000 characters per chunk, 100 character overlap), using LangChain's `RecursiveCharacterTextSplitter`. This means retrieval can return just the relevant portion of a document rather than the entire file.

## Duplicate Detection

Before new content is stored, CoSMIC checks it against existing content to avoid redundant entries. Content scoring at or above a configured duplicate-detection similarity threshold (default `0.98`) — or found to be a near-exact text match — is skipped rather than added again. This threshold is deliberately high: CoSMIC only skips content that's almost identical to what's already stored, not merely similar.

**Note:** This deduplication threshold (0.98, applied when adding content) is separate from the relevance threshold used when retrieving content during RAG — see [Retrieval-Augmented Generation](./rag.md).

## Adding Content

Content can be added as PDF documents or as plain text statements, either through direct upload or automatically by a background process that watches for new files. PDFs are split into chunks before storage; text statements are stored more directly, with the current date appended. Either way, content that passes the duplicate check is embedded and stored.

## Document Tracking

Alongside the vector database itself, CoSMIC keeps a separate record of what's been added — noting the source file, when it was added, and which layer (conversation, user, or global) it belongs to. This is used to check for duplicates, list what's stored, and remove entries when a document is deleted.