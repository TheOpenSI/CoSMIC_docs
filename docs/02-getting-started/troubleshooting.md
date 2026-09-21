---
id: getting-started-troubleshooting
title: Troubleshooting
sidebar_label: Troubleshooting
sidebar_position: 5
---

### A Container Exits During Startup

```bash
docker compose ps -a

docker compose logs --tail=200 <service-name>
```

- Check for missing environment variables or secret files.
- Confirm that required ports are not already in use.
- Check that database and model dependencies are reachable on the configured network.
- Rebuild after changing build-time settings: `docker compose up --build -d`.

### The UI Cannot Reach the API

- Verify the API base URL in the UI environment configuration.
- Confirm that the backend service is running and exposed through the expected compose network or proxy.
- Review browser developer tools and UI container logs for the failing request.
- Check cross-origin and proxy settings against the current repository configuration.

### A Local Model Is Unavailable

- Confirm the model runtime container is running.
- Check that the configured model name matches a model installed or supported by that runtime.
- Review the model-runtime and CoSMIC Core logs.
- Confirm sufficient disk, memory and GPU resources for the selected model.

### Document Retrieval Does Not Use the Uploaded Content

- Confirm that the upload completed successfully.
- Check the CoSMIC Core and vector-store logs for indexing errors.
- Verify that the question is related to the uploaded content.
- Check the retrieval, embedding and re-ranking configuration in the target branch.

### Reset the Local Deployment

Stop the platform without deleting persistent data:

```bash
docker compose down
```

Deleting volumes also removes persistent local data. Use the following only when a clean reset is intended:

```bash
docker compose down -v
```

**Data-loss warning**

The `-v` option removes Compose-managed volumes. Back up any data that must be retained before running it.