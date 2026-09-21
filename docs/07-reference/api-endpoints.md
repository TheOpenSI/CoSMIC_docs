---
id: reference-api-endpoints
title: API Endpoints
sidebar_label: API Endpoints
sidebar_position: 1
---

**Integrating directly with CoSMIC.**

The CoSMIC backend exposes a REST API built with FastAPI, handling chat processing, model management, and file upload. The API listens on port 3000 inside the cosmic container — the port it's actually reachable at from outside depends on your deployment's compose configuration, so check the current compose file rather than assuming 3000 is exposed externally.

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/v1/models` | GET | List available models |
| `/api/v1/models/\{model_name\}` | DELETE | Remove a model |
| `/api/v1/models/pull` | POST | Start downloading a model |
| `/api/v1/models/pull/\{job_id\}` | GET | Check download progress |
| `/api/v1/cosmic` | POST | Main chat endpoint |
| `/api/v1/cosmic` | PATCH | Reload configuration |
| `/api/v1/memory/upload` | POST | Upload a document |

## GET /api/v1/models

Lists models currently available.

Response:

```json
{
    "models": [
        {
            "model": "qwen2.5:7b",
            "id": "a1b2c3d4e5f6",
            "size": "4.7 GB",
            "modified_at": "...",
            "family": "qwen2"
        }
    ],
    "total": 1
}
```

## DELETE /api/v1/models/\{model_name\}

Removes a model.

## POST /api/v1/models/pull

Starts downloading a model in the background. Returns a job ID rather than waiting for the download to finish, since downloads can take a while.

Response:

```json
{ "job_id": "..." }
```

## GET /api/v1/models/pull/\{job_id\}

Checks the status of a download started above — whether it's still running, finished, or failed.

## POST /api/v1/cosmic

The primary endpoint used for all chat requests.

Request body:

```json
{
    "body": {
        "user": { "id": "...", "role": "...", "email": "..." },
        "messages": [ ... ]
    },
    "user_message": "the current question"
}
```

`body.user` identifies who's asking; `body.messages` is the recent conversation history; `user_message` is the current question.

Internal processing, in order:

1. Configuration reload — checks whether configuration has changed since the last request, and rebuilds the internal CoSMIC instance if so, so config changes take effect without a manual restart.
2. User extraction — pulls user information from the request.
3. Chat history — builds recent conversation context, keeping only the last 5 user/assistant pairs — see [Context Management](../03-core-concepts/context-management.md).
4. User-specific knowledge base — associates the request with the user's own stored content, so different users maintain separate document collections.
5. File upload detection — checks for attached file references in the message; if present, each referenced file is retrieved before the original question is processed.
6. AI processing — classifies and routes the request to the appropriate service.
7. Response — returns the generated answer.

Response:

```json
{
    "status": "success",
    "result": "<generated response>"
}
```

**Note:** usage statistics tracking existed in the previous version but is currently disabled in source — not documented here as active behaviour. This is different from the resource/emissions tracking described under [Observability](./observability.md), which is active — only per-user usage statistics are disabled.

## PATCH /api/v1/cosmic

Reloads configuration. If it's changed since the last request, CoSMIC rebuilds itself entirely — this is closer to a restart than a live update.

## POST /api/v1/memory/upload

Uploads a document into your own conversation or account. Rejects a duplicate filename within the same scope rather than storing it twice.

Response:

```json
{
    "file_id": "...",
    "file_name": "...",
    "file_path": "...",
    "content_type": "...",
    "chunk_count": 4
}
```