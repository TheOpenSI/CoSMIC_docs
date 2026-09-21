---
id: architecture-data-persistence
title: Data Persistence
sidebar_label: Data Persistence
sidebar_position: 4
---

CoSMIC stores information in three separate places:

1. Qdrant — the document embeddings themselves.
2. A separate document index — not CoSMIC DB — recording what's been stored, used for de-duplication and for keeping track of what belongs to which user, conversation, or shared collection.
3. The filesystem — the original uploaded files.

## Storage Event Watcher

A background process watches for files being added, changed, or removed, and keeps all three storage layers above in sync automatically. This currently only applies to content shared globally across a service — documents uploaded by an individual user or within a single conversation go through a direct upload step instead. Before processing a file, it waits until the file's size stops changing, so it doesn't try to index a file that's still being copied.