export type WebmentionsClientOptions = {
    apiKey: string;
    domain: string;
}

export type WebmentionsLoaderOptions = WebmentionsClientOptions & {
    incremental?: boolean;
}

export type Webmention = {
    id: number;
    type: string;
    author: WebmentionAuthor;
    url: string;
    content: WebmentionContent;
    published: Date;
    received: Date;
    source: string;
    target: string;
    property: 'in-reply-to' | 'like-of' | 'repost-of' | 'bookmark-of' | 'mention-of' | 'rsvp';
    isPrivate: boolean;
}

export type WebmentionAuthor = {
    type: string;
    name: string;
    url: string;
    photo: string;
}

export type WebmentionContent = {
    text: string;
    html: string;
}