import { defineCollection, z } from 'astro:content';

const garden = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    // Transform string to Date object
    pubDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

const portfolio = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date().optional(),
    image: z.string().optional(),
    link: z.string().optional(),
  }),
});

const work = defineCollection({
  schema: z.object({
    role: z.string(),
    company: z.string(),
    companyUrl: z.string().optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(), // If empty, then "Present"
    description: z.string(),
    achievements: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { garden, portfolio, work };
