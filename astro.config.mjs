import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import remarkWikiLink from 'remark-wiki-link';
import rehypeCallouts from 'rehype-callouts';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  markdown: {
    remarkPlugins: [
      [remarkWikiLink, { 
        hrefTemplate: (permalink) => `/garden/${permalink}`,
        pageResolver: (name) => [name],
        aliasDivider: '|'
      }]
    ],
    rehypePlugins: [rehypeCallouts],
  },
});
