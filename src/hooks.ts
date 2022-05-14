import type { Handle } from '@sveltejs/kit';

// parse response for Page Embed
// fetch page from endpoint (using named layout for page fragments?)
// sanitize external responses
// avoid recursive hook
// inject embedded content
// return response with transclusion
export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	const body = await response.text();

	const regex = /^\/embed\//;
	if (event.url.pathname.match(regex)) {
		// const pageId = '62751c5f-eea1-4d59-8977-eab7b8759b31';
		const foo = await fetch('/embed/Cloudflare', {
			headers: {
				'access-control-allow-origin': '*', // allow cross-site embeds
				'connection-type': 'text/html' // serve JSON instead of text/html?
			}
		});
		if (foo.ok) {
			console.log(foo);
		}
	}

	return new Response(body, response);
};
