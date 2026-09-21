---
id: getting-started-first-launch
title: First Launch
sidebar_label: First Launch
sidebar_position: 3
---

## 5. First Launch

1. Open the CoSMIC UI using the host and port configured by the unified compose and UI environment files.
2. Confirm that the interface can reach the backend and that the backend can reach CoSMIC Core.
3. Open the model or administration area and verify that the configured model provider is available.
4. Start a new conversation and submit a basic question.
5. Upload a small supported document, then ask a question that can be answered from that document.
6. Review container logs to confirm that the request completed without service, retrieval or database errors.

**Avoid hard-coded web addresses**

The public website documentation should point readers to the host and port defined by the current compose and environment files, rather than publishing a port that may change between branches or deployments.

## 6. Verify the Installation

Use the following checks as a minimum smoke test.

| Area | Check | Expected result |
|---|---|---|
| Containers | Run `docker ps` | Configured services remain running. |
| UI to backend | Open the UI and load an application page | The page loads without an API-connection error. |
| Chat | Send a simple prompt | A response is returned through the configured model path. |
| Persistence | Refresh or reopen a saved conversation | Persisted data remains available when the feature is enabled. |
| Knowledge retrieval | Upload a small document and query it | The response uses relevant document content. |
| Logs | Review recent service logs | No unresolved startup, migration or connection failure is present. |