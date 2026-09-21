---
id: core-concepts-llms
title: Large Language Models (LLMs)
sidebar_label: Large Language Models (LLMs)
sidebar_position: 2
---

Every request starts with one LLM — the query analyser — figuring out which service should handle it. What happens next depends on the request: general and document-grounded questions go to a second, answering LLM; chess requests are calculated by a chess engine, not a language model, with the answering LLM only stepping in afterward to explain the move; code generation and memory-save requests may not involve the answering LLM at all.

## LLM Backends

CoSMIC can run each of these two LLM roles on three different backends:

1. Local Hugging Face models — a small, fixed set of models (Mistral 7B, Mistral 7B Instruct, Gemma 7B, Gemma 7B Instruct, and OpenSI's own finetuned chess model). Runs on GPU, optionally with 4-bit quantisation.
2. GPT — OpenAI's models, via API. Requires an `OPENAI_API_KEY`.
3. Ollama — any model from the Ollama library, run locally through the Ollama container.

The routing model and the answering model are set independently, and each can use any of the three backends.

## Supported Models

A fixed set of local models is available, each mapped to its Hugging Face repository:

| Model Name | Hugging Face Repository |
|---|---|
| mistral-7b-v0.1 | mistralai/Mistral-7B-v0.1 |
| mistral-7b-instruct-v0.1 | mistralai/Mistral-7B-Instruct-v0.1 |
| gemma-7b | google/gemma-7b |
| gemma-7b-it | google/gemma-7b-it |
| mistral-7b-finetuned | OpenSI/cognitive_AI_chess |

These model names are used directly, rather than requiring the full repository path.

CoSMIC also supports:

- Ollama models — any model available at ollama.com/library, specified as `ollama:<model name>` (e.g. `ollama:qwen2.5:7b`).
- OpenAI models — e.g. `gpt-3.5-turbo`, `gpt-4o`. Requires a valid `OPENAI_API_KEY`.

## Model Configuration Parameters

**`is_quantised`**
Default: `False`
`False` loads the model at full precision. `True` loads a 4-bit compressed version, using less memory and generally running faster, at the cost of a small reduction in accuracy.

**`seed`**
Default: `0`
Sets the random seed used during text generation. The same seed produces consistent, reproducible outputs; a different seed may produce different, but still valid, responses.

## GPU / CPU

When running on CPU, CoSMIC automatically disables 4-bit quantisation, overriding `is_quantised` to `False` regardless of the configured value — the underlying quantisation library requires a GPU. This override happens silently, with no warning shown, so a CPU-only setup with quantisation enabled in configuration will run at full precision without indicating why.

## Response Handling

Each backend turns its raw model output into a final response differently:

- Local models and GPT/Ollama each check for a different marker in the raw output to know where the real answer starts or ends (for example, an instruction tag, an end-of-message marker, or a fixed heading). There's no shared, structured format across backends — if a model's output doesn't match the marker its backend expects, the response can come back malformed rather than raising an error.
- GPT-backed models can load extra instructions from a per-service prompt file, added on top of CoSMIC's base identity prompt — this is how a request gets backend-specific guidance depending on which service is handling it.
- Ollama models re-check that the model is actually available every time one is used, not just once at startup. If it isn't, CoSMIC attempts to download it automatically, with retry logic if the download is interrupted.