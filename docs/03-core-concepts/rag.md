---
id: core-concepts-rag
title: Retrieval-Augmented Generation (RAG)
sidebar_label: Retrieval-Augmented Generation (RAG)
sidebar_position: 6
---

**How does CoSMIC answer using documents?**

RAG lets CoSMIC answer questions using information stored in its knowledge base, rather than relying solely on the language model's built-in knowledge. Before generating a response, CoSMIC retrieves relevant stored content and gives it to the LLM as additional context.

```
Question
 │
 ▼
Embedding + Vector Search
 │
 ▼
Candidate Pool (30)
 │
 ▼
Re-ranking
 │
 ▼
Top Results (6)
 │
 ▼
Context Assembly
 │
 ▼
Response Generation

 ```


## How It Works

Retrieval isn't a single blanket search — it looks across whichever content is relevant to the request: the current conversation, the current user's own content, and anything shared more broadly. If a file's been attached to the message, retrieval focuses specifically on that file.

It happens in two passes. First, a broader set of candidate results is pulled based on similarity to the question. Second, those candidates are re-ranked with a more precise comparison, and only the strongest matches make it through.

This only kicks in for requests where grounding the answer in documents actually makes sense, or when a file's attached — not for every general question.

If nothing quite meets the relevance bar, CoSMIC still passes along its best match rather than giving the LLM nothing to work with — so a useful answer stays possible even when retrieval doesn't find a strong hit. At its default value of 0.0, this threshold has little practical filtering effect on its own. When retrieval produces candidates, the fallback behaviour ensures that the best available result can still be passed to the LLM even when the configured threshold would otherwise exclude the results.

**Note:** the relevance bar used here, at the moment of retrieval, is a different threshold from the one used to catch duplicate content when something's first added — see [Vector Databases](./vector-databases.md).

## Output

RAG returns two values: the combined context text passed to the LLM, and a set of scores for the retrieved content — these are reranker scores when re-ranking is enabled, or plain vector-similarity scores otherwise. The two aren't the same measurement, so a score here shouldn't be compared directly against the duplicate-detection threshold.