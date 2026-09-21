---
id: reference-data-model
title: Data Model
sidebar_label: Data Model
sidebar_position: 3
---

Content is stored in three tiers: scoped to the current conversation (default), scoped to a specific user, or shared globally. Each stored document carries an ID, a content hash (used to detect duplicates), which tier it belongs to, and tier-specific details — which user and conversation it belongs to, or which shared service it's associated with.