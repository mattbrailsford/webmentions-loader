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
    property: WebmentionProperty;
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

export enum WebmentionProperty {
    InReplyTo = 'in-reply-to',
    LikeOf = 'like-of',
    RepostOf = 'repost-of',
    BookmarkOf = 'bookmark-of',
    MentionOf = 'mention-of',
    RSVP = 'rsvp'
}