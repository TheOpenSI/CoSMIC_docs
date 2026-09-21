---
id: core-concepts-query-routing
title: Query Analysis & Service Routing
sidebar_label: Query Analysis & Service Routing
sidebar_position: 1
---

CoSMIC is designed around orchestration rather than direct model invocation. Instead of sending every request directly to a language model, CoSMIC first analyses the request and determines which specialised service should process it.

The Query Analyser determines which service should handle a user's request. When a query comes in, it's examined and routed to the appropriate service, using a dedicated LLM separate from the one that generates the final answer.

```
User Query
 │
 ▼
Query Analyser LLM
 │
 ▼
Service Selection
 │
 ▼
Selected CoSMIC Service
 │
 ▼
Response
```


Unlike a fixed list of options, the services available for routing aren't hardcoded — they're fetched from a live list of active services each time. Confirmed services in the current codebase:

| Service | Purpose |
|---|---|
| System information | Answers questions about CoSMIC itself |
| Chess | Predicts the next move from a FEN position or a move sequence |
| Save to memory | Writes text into the knowledge store |
| Code generation | Generates or improves code |
| General question answering | Retrieves relevant stored content and answers using it |
| Fallback | Used when no other service can handle the request |

The Query Analyser works by asking its LLM to pick one of these services and respond with just that choice — no explanation. That response is then read to figure out which service was selected. If the response doesn't clearly indicate a valid service, the request falls back to the general fallback response instead.

For chess and memory-update requests, the analyser does additional parsing on its own — pulling out FEN positions, move sequences, file paths, or quoted text from the request — after the initial service is selected.