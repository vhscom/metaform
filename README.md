# Metaform

Experimental web front-end for Logseq.

## Features

- Display Logseq data on the open web.
- Edge-side page and block embeds.
- Web form to upload Logseq JSON exports.
- REST endpoints for page and block data.
- Works with JavaScript disabled.

## Demo

[View pre-recorded live demo](https://twitter.com/vhsdev/status/1530160309112954881) on Twitter.

## How it works

1. Upload [triggers data extraction](https://vhs.codeberg.page/post/creating-json-extract-supabase/) to Postgres database hosted on Supabase.
1. Page assembled on-the-fly inside Cloudflare edge function using Web Workers.
1. Functions perform server-side transclusion using recursive async reducer functions.
1. API endpoints called whenever a reducer needs more data.
1. Svelte components used to assemble display.
1. Display logic searches content for embed tags and injects available data.

## Performance

Lighthouse tests on Cloudflare have shown depth 6 page embeds with 300ms first paint.

## Requirements

- [Supabase](https://supabase.com/) instance with fresh project.
- [Cloudflare Pages](https://pages.cloudflare.com/) account.
- GitHub for simple Pages deployment

## Online use

1. Copy source to your own GitHub repo
1. Create accounts on Supabase and Cloudflare Pages
1. Run `setup.sql` in Supabase SQL editor
1. Add [Supabase environment variables](https://github.com/vhscom/metaform/blob/trunk/src/lib/core/services/supabase.ts#L16-L17)
1. Push commit to GitHub to deploy to Cloudflare
1. Navigate to Pages site
1. Upload Logseq JSON export from upload page

## Development

You must have [Bun] and a recent Node.js LTS. Using [fnm] a Node.js LTS will be installed automatically.

1. Copy source code into a working directory
1. Create `.env.local` by copying `.env.example` (See [Online use](#online-use) for settings.)
1. Run command `bun install` to install dependencies
1. Run `setup.sql` in the Supabase SQL editor
1. Start dev server with `bunx vite dev` use `h` for help

### Justfile

[Just] is like `make` only a little more forgiving. [Installation instructions](https://github.com/casey/just#installation).

- `just` list recipes
- `just supabase` run supabase cli commands with bunx
- `just dev` start a vite dev server with bun
- `just test` run api tests with curl
- `just build` build for production with vite
- `just preview` preview build with vite
- `just clean` spic and span edition
- List recipes to view more

[bun]: https://bun.sh/
[just]: https://github.com/casey/just
[fnm]: https://github.com/Schniz/fnm
