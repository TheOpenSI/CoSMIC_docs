---
id: architecture-overview
title: High-Level Architecture
sidebar_label: High-Level Architecture
sidebar_position: 1
---

```
                     CoSMIC UI
                          │
                          ▼
                     CoSMIC Core
                          │
       ┌──────────────────┼──────────────────┐
       ▼                  ▼                  ▼
 Service Layer      Knowledge Layer      Model Layer
       │                  │                  │
       ▼                  ▼                  ▼
Dynamic Services      Vector Store       LLM Providers
       │                  │                  │
       └──────────────────┬──────────────────┘
                          ▼
              ┌─────────────────────┐
              ▼                     ▼
         CoSMIC DB            Observability
```


The platform separates orchestration, storage, user experience and model execution into independent components that can scale and evolve independently. The next section traces exactly what happens to a single request as it moves through these components.

## System Overview

CoSMIC is a modular AI platform that routes user requests to specialised services rather than relying on a single language model for every task.

Instead of sending every prompt directly to a large language model, CoSMIC first analyses the user's request, determines which service is best suited to handle it, and then delegates the request accordingly. This allows different components to specialise in different tasks — document retrieval, code generation, chess analysis, and general reasoning.

```
                      User
                      │
                      ▼
              POST /api/v1/cosmic
                      │
                      ▼
         Chat History Built (last 5 user/assistant pairs)
                      │
                      ▼
               CoSMIC Core
                      │
                      ▼
              Query Analyser LLM
              (classifies request)
                      │
                      ▼
               Service Selection
                      │
     ┌────────────┬────────────┬─────────────┐
     ▼             ▼            ▼             ▼
  Chess          Save to     Code Gen     General QA
  Engine         Memory                       │
 (Stockfish)   (Knowledge Store)              ▼
     │                                  RAG (retrieve from
     │                                   Vector DB, 3-tier)
     └──────────────┬────────────────────────┘
                     ▼
              Main LLM
      (generates or explains response)
                     │
                     ▼
                Returned to caller
```


Chat history is built before the query analyser runs. It doesn't influence which service gets selected — it's only used afterward, by the general question-answering branch.

That same field also carries retrieved document content when RAG is active. CoSMIC distinguishes the two based on the formatting of the context field, rather than treating them as the same type of content.

The Main LLM isn't one branch among several — it's invoked by more than one path, including the chess branch, where Stockfish computes the actual move and the LLM only explains the reasoning afterward.

One OpenSICoSMIC instance is kept running for the lifetime of the application and shared across every request, rather than being created fresh each time.
