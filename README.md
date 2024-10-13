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
      apiKey: WEBMENTIONSIO_API_KEY,
      domain: WEBSITE_DOMAIN
  })
});

export const collections = { webmentions };
```
You can then use these like any other content collection in Astro:

```astro
---
import { getCollection } from "astro:content";
import type { Webmention } from "webmentions-loader";

const webmentions : Webmention[] = getCollection("webmentions").map(wm => wm.data);
const pageWebmentions : Webmention[] = webmentions.filter(wm => wm.target == Astro.url.toString());
const pageLikes : Webmention[] = pageWebmentions.filter(wm => wm.property == 'like-of');
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

| Property      | Description                                                                                                                                                                |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `apiKey`      | The [webmentions.io](https://webmentions.io) API key for your account.                                                                                                     |
| `domain`      | The domain of the site to fetch webmentions for (as configured in webmentions.io).                                                                                         |
| `incremental` | If `true`, the loader will only fetch new/updated discussions since the last build. Otherwise the loader will fetch all blog posts on every build. The default is `false`. |


## Type Information

The loader will return an array of `Webmention` objects, each with the following data structure:

### `Webmention`

```text
{
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
```

### `WebmentionAuthor`

```text
{
    type: string;
    name: string;
    url: string;
    photo: string;
}
```

### `WebmentionContent`

```text
{
    text: string;
    html: string;
}
```

TypeScript types are available for all of the above.

```typescript
import type { Webmention, WebmentionAuthor, WebmentionContent } from 'webmentions-loader'
```