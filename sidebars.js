// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  tutorialSidebar: [
    'home/home',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/getting-started-overview',
        'getting-started/getting-started-installation',
        'getting-started/getting-started-first-launch',
        'getting-started/getting-started-component-setup',
        'getting-started/getting-started-troubleshooting',
        'getting-started/getting-started-next-steps',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        'core-concepts/core-concepts-query-routing',
        'core-concepts/core-concepts-llms',
        'core-concepts/core-concepts-context-management',
        'core-concepts/core-concepts-knowledge-architecture',
        'core-concepts/core-concepts-vector-databases',
        'core-concepts/core-concepts-rag',
        'core-concepts/core-concepts-chess-services',
      ],
    },
    'using-cosmic/using-cosmic',
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'architecture/architecture-overview',
        'architecture/architecture-platform-components',
        'architecture/architecture-core-services',
        'architecture/architecture-data-persistence',
        'architecture/architecture-configuration',
        'architecture/architecture-principles',
      ],
    },
    'development/development',
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/reference-api-endpoints',
        'reference/reference-observability',
        'reference/reference-data-model',
        'reference/reference-network-diagram',
      ],
    },
  ],
};

export default sidebars;