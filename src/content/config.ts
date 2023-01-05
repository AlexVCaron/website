import { z, defineCollection } from 'astro:content';

const events = defineCollection({
    schema: {
        title: z.string(),
        subtitle: z.string(),
        type: z.enum(['talk', 'workshop', 'hackathon', 'poster', 'tutorial', 'training']),
        start_date: z.string(),
        start_time: z.string().transform((str) => str.replace(/\s+(\w+)/, ' ($1)')),
        end_date: z.string(),
        end_time: z.string().transform((str) => str.replace(/\s+(\w+)/, ' ($1)')),
        location_name: z.string().optional(),
        location_url: z.string().url().or(z.string().startsWith('#')).or(z.array(z.string().url())).optional(),
        start: z.date().optional(),
        end: z.date().optional(),
    },
});

export const collections = {
    events: events,
};
