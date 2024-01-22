<script context="module" lang="ts">
	// Don't foreget me. I still exist.
</script>

<script lang="ts">
	import Navigation from '$lib/Navigation.svelte';

	import '../app.css';

	// See https://kit.svelte.dev/docs/page-options#config
	// for information about this configuration
	export const config = {
		runtime: 'edge',
		regions: 'all',
		foo: {
			bar: true
		}
	};
</script>

<Navigation />
<slot />

<style>
	:global(p a) {
		color: green;
	}

	:global(p a:visited) {
		color: goldenrod;
	}

	:global(a:hover:not(nav a)) {
		background-color: rgba(22, 22, 22, 0.33);
		color: darkgoldenrod;
	}

	:global(a:focus) {
		background-color: rgba(88, 88, 88, 0.33);
		outline: none;
	}
</style>
