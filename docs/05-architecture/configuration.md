---
id: architecture-configuration
title: Configuration
sidebar_label: Configuration
sidebar_position: 5
---

Application-level configuration is stored in the database, while service, deployment, and retrieval settings are supplied through environment variables. Changing the default settings CoSMIC starts with means editing the migrations in CoSMIC DB — that's what seeds the configuration values, rather than a config file you'd edit directly.

There are two configuration layers, each covering different things. CoSMIC DB handles the application-level settings — which models power the answering and routing LLMs, and their quantisation and seed. Everything else — service addresses, API keys, container hostnames, and all the retrieval tuning (thresholds, chunk counts, embedding and reranker models) — is set through environment variables.

Since these two cover separate settings rather than the same ones, there's no overlap to worry about between them.

## Environment Variables

| Variable | Purpose |
|---|---|
| `QDRANT_URL` | Where to reach Qdrant |
| `OLLAMA_SERVICE_NAME` | The Ollama container's address |
| `RAG_EMBEDDING_MODEL` | Which model to use for embedding documents (default: gte-small) |
| `RAG_RERANKER_MODEL` | Which model to use for re-ranking search results (default: BAAI/bge-reranker-v2-m3) |
| `RAG_UPDATE_THRESHOLD` | Duplicate-detection similarity threshold — how similar new content needs to be to existing content before it's treated as a duplicate (default: 0.98) |
| `RAG_RETRIEVE_SCORE_THRESHOLD` | Minimum relevance score for retrieved content to be used (default: 0.0). If nothing meets this threshold, the single best-scoring result is kept anyway rather than returning no context at all — see [Retrieval-Augmented Generation](../03-core-concepts/rag.md) |
| `RAG_TOPK` | How many results to retrieve (default: 6) |
| `RAG_RERANK_ENABLED` | Whether re-ranking is turned on (default: true) |
| `RAG_CANDIDATE_POOL` | How many results to consider before re-ranking narrows them down (default: 30) |
| `RAG_RERANK_TOPK` | How many results are kept after re-ranking (default: 6) |
| `RAG_RERANK_SCORE_THRESHOLD` | Minimum score to keep after re-ranking (default: 0.0) |
| `OPENAI_API_KEY` | Required if any configured model uses OpenAI |
| `hf_token` / `hf_token_finetune` | Hugging Face access for downloading local models (the finetuned model needs its own separate token) |
| `SERVICES_API_URL` | Where to fetch the list of available services |