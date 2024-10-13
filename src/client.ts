import {Webmention, WebmentionsClientOptions} from "./types";

export function webmentionsClient({
    apiKey,
    domain
} : WebmentionsClientOptions)  {
    
    const mapWebmention = (webmention) : Webmention => {
        return {
            id: webmention['wm-id'],
            type: webmention.type,
            author: {
                type: webmention.author.type,
                name: webmention.author.name,
                url: webmention.author.url,
                photo: webmention.author.photo
            },
            url: webmention.url,
            content: {
                text: webmention.content.text,
                html: webmention.content.html
            },
            published: new Date(webmention.published),
            received: new Date(webmention['wm-received']),
            source: webmention['wm-source'],
            target: webmention['wm-target'],
            property: webmention['wm-property'],
            isPrivate: webmention['wm-private'] === true
        }
    }
    
    const getWebmentions = async (page:number = 0, pageSize:number = 100, since?:string) : Promise<Webmention[]> => {
        const url = `https://webmention.io/api/mentions.jf2?domain=${domain}&token=${apiKey}&per-page=${pageSize}&page=${page}${since ? `&since=${since}` : ''}`;
        const response = await fetch(url);
        const body = await response.json();
        return body.children.map(mapWebmention);
    }

    const getWebmentionsRecursive = async(page: number, pageSize: number, since?:string): Promise<Webmention[]> => {
        const webmentions = await getWebmentions(page, pageSize, since);
        if (webmentions.length < pageSize) {
            return webmentions.concat(await getWebmentionsRecursive(page + 1, pageSize, since))
        }
        return webmentions;
    }
    
    return {
        getWebmentions: async (since?: string): Promise<Webmention[]> => {
            return await getWebmentions(0, 100, since);
        }
    }
}