import {Loader} from "astro/dist/content/loaders";
import {WebmentionsLoaderOptions} from "./types";
import {webmentionsClient} from "./client";
import {z} from "astro/zod";

export function webmentionsLoader({
    apiKey,
    domain,
    incremental = false
} : WebmentionsLoaderOptions): Loader {
    return {
        name: "webmentions-loader",
        load: async ({store, parseData, generateDigest, meta, config, logger}): Promise<void> => {

            let lastModified = meta.get('last-modified');
            if (incremental) {
                logger.info(`Last Modified: ${lastModified}`);
            }
            
            const client = webmentionsClient({
                apiKey,
                domain
            });
            const webmentions = await client.getWebmentions(incremental ? lastModified : undefined);

            logger.info(`Processing ${webmentions.length} webmentions`);

            let maxUpdatedDate: Date = new Date(lastModified ?? 0);

            if (!incremental) {
                store.clear();
            }

            for (const item of webmentions) {
                
                const data = await parseData({
                    id: item.id.toString(),
                    data: item,
                });

                const digest = generateDigest(data);

                store.set({
                    id: item.id.toString(),
                    data,
                    digest
                });

                if (item.received > maxUpdatedDate) {
                    maxUpdatedDate = item.received;
                }
            }
        },
        schema: () => z.object({
            id: z.number(),
            type: z.string(),
            author: z.object({
                type: z.string(),
                name: z.string(),
                url: z.string(),
                photo: z.string()
            }),
            url: z.string(),
            content: z.object({
                text: z.string(),
                html: z.string()
            }),
            published: z.date(),
            received: z.date(),
            source: z.string(),
            target: z.string(),
            property: z.string(),
            isPrivate: z.boolean()
        })
    }
}