# Webmentions Loader

This package provides a Webmentions.io loader for Astro.

## Requirements

This package requires Astro 5.0.0-beta or later.

## Installation

```sh
npm install webmentions-loader
```

## Usage

You can use the `webmentionsLoader` in your content configuration at `src/content/config.ts`:

```typescript
import { defineCollection } from "astro:content";
import { webmentionsLoader } from "webmentions-loader";

const webmentions = defineCollection({
  loader: webmentionsLoader({
      apiKey: WEBMENTIONS_IO_API_KEY,
      domain: WEBSITE_DOMAIN
  })
});

export const collections = { webmentions };
```
You can then use these like any other content collection in Astro:

```astro
---
import { getCollection } from "astro:content";
import type { Webmention, WebmentionProperty } from "webmentions-loader";

const webmentions : Webmention[] = getCollection("webmentions").map(wm => wm.data);
const pageWebmentions : Webmention[] = webmentions.filter(wm => wm.target == Astro.url.toString());
const pageLikes : Webmention[] = pageWebmentions.filter(wm => wm.property == WebmentionProperty.LikeOf);
---
...
<div>{{ pageLikes.length }} Likes</div>
...
```

## Options

The `webmentionsLoader` function takes an options object with the following structure:

```text
{
  apiKey: string,
  domain: string,
  incremental?: boolean
}
```

| Property      | Description                                                                                                                                                         |
|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `apiKey`      | The [webmentions.io](https://webmentions.io) API key for your account.                                                                                              |
| `domain`      | The domain of the site to fetch webmentions for (as configured in webmentions.io).                                                                                  |
| `incremental` | If `true`, the loader will only fetch new webmentions since the last build. Otherwise the loader will fetch all webmentions on every build. The default is `false`. |


## Type Information

The loader will return an array of `Webmention` objects, each with the following data structure:

### `Webmention`

```typescript
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
```

### `WebmentionAuthor`

```typescript
export type WebmentionAuthor = {
    type: string;
    name: string;
    url: string;
    photo: string;
}
```

### `WebmentionContent`

```typescript
export type WebmentionContent = {
    text: string;
    html: string;
}
```

### `WebmentionProperty`

```typescript
export enum WebmentionProperty {
    InReplyTo = 'in-reply-to',
    LikeOf = 'like-of',
    RepostOf = 'repost-of',
    BookmarkOf = 'bookmark-of',
    MentionOf = 'mention-of',
    RSVP = 'rsvp'
}
```

TypeScript types for all of the above can be imported from the `webmentions-loader` package.

```typescript
import type { Webmention, WebmentionAuthor, WebmentionContent, WebmentionProperty } from 'webmentions-loader'
```