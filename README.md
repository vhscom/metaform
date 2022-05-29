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

1. Upload triggers data extraction to Postgres database hosted on Supabase.
1. Page assembled on-the-fly inside Cloudflare edge function using Web Workers.
1. Functions perform server-side transclusion using recursive async reducer functions.
1. API endpoints called whenever a reducer needs more data.
1. Svelte components used to assemble display.
1. Display logic searches content for embed tags and injects available data.

## Performance

Lighthouse tests on Cloudflare have shown depth 6 page embeds with 300ms first paint. Further testing has shown page loads in as little as 200ms.

## Requirements

- [Supabase](https://supabase.com/) instance with fresh project.
- [Cloudflare Pages](https://pages.cloudflare.com/) account.
- GitHub for simple Pages deployment

## Online use

1. Copy source to your own GitHub repo
1. Create accounts on Supabase and Cloudflare Pages
1. Run `setup.sql` in Supabase SQL editor
1. Add Supabase project URL and API keys to CF environment variables
1. (Recommend) Configure Cloudflare Pages to use PNPM
1. Push commit to GitHub to deploy to Cloudflare
1. Navigate to Pages site
1. Upload Logseq JSON export from upload page

## Development

Make sure you have Node 16 and Pnpm CLI.

1. Copy source locally
1. Run `pnpm install`
1. Create a `.env.local` file in project root
1. Add 2 environment vars for Supabase project and anon key
1. Run `setup.sql` in Supabase SQL editor
1. Run locally with `pnpm dev` and open site in browser
1. Use `pnpm build && pnpm preview` and open site in browser
