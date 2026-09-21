---
id: reference-network-diagram
title: Network Diagram (Containers)
sidebar_label: Network Diagram
sidebar_position: 4
---

```
cosmic (API + orchestration, :3000)
│
├── ollama (:11434)
├── qdrant (:6333)
└── CoSMIC DB (backend)
```

All containers join the `cosmic_net` Docker network. CoSMIC DB provides configuration, the services list, and chat storage — it runs as its own container, defined in its own repository, joined to this same network rather than being started by this repo's compose file.