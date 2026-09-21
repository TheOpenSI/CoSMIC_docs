---
id: architecture-core-services
title: Core Services
sidebar_label: Core Services
sidebar_position: 3
---

**CoSMIC** — The main application. Sets up the core pieces — the answering model, the query analyser, code generation, system information, and the fallback response — when it starts. The vector database and retrieval setup are created separately, per user, the first time they're needed rather than all at once at startup.

**Ollama** — Hosts and runs models locally. CoSMIC talks to it directly rather than going through the same processing steps used for other model types. Every time a model is used, CoSMIC re-checks that it's actually available, rather than only checking once when the system starts.

**Qdrant** — Stores document embeddings. Everything is kept in a single collection and compared using cosine similarity. There's no local fallback if Qdrant is unavailable.

**Note:** This fourth service is CoSMIC DB — configuration, the services list, and chat history are read from and written to it over the network. Previous versions also used it for usage logging.

**Note:** Physically, this is one Qdrant collection. The three layers — conversation, user, and global — aren't separate databases; they're logical scopes applied through metadata filters within that one collection.