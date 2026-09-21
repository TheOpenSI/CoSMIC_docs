---
id: architecture-platform-components
title: Platform Components
sidebar_label: Platform Components
sidebar_position: 2
---

The CoSMIC ecosystem consists of three primary projects. A fourth repository, CoSMIC Docker, packages and deploys these three together — it's a deployment tool, not a fourth application component.

## CoSMIC Core

The orchestration engine responsible for:

- Service routing
- Knowledge retrieval
- Model management
- Response generation
- API services

CoSMIC Core acts as the central intelligence layer of the platform.

## CoSMIC UI

Provides the user-facing interface for interacting with CoSMIC services, knowledge repositories and administrative capabilities.

## CoSMIC DB

Provides platform persistence and configuration management, supporting:

- System configuration
- Metadata management
- Service registration
- Chat persistence
- Platform administration

The documentation already notes that configuration is database-driven rather than file-driven.