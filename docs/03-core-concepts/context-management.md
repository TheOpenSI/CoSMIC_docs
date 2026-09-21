---
id: core-concepts-context-management
title: Context Management
sidebar_label: Context Management
sidebar_position: 3
---

Controls how much of the prior conversation the LLM sees. Large language models don't retain memory of previous turns on their own — each request is independent, so prior conversation has to be explicitly included in the prompt for the model to be aware of it.

Before a question reaches CoSMIC, the chat endpoint builds this history from the incoming messages. It scans the message list for adjacent user-then-assistant pairs and keeps the last 5 such pairs; anything that breaks that pattern (for example, a system message) is skipped rather than paired. Older exchanges beyond the last 5 pairs are not included in the prompt.

This conversation history is passed into CoSMIC alongside the current question as context. The same field also carries retrieved document content when RAG is active, so CoSMIC distinguishes the two by checking whether the text is formatted as conversation history before treating it as chat history or document context — the two are never mixed together.