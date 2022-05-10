<script lang="ts">
	const items = [
		{ href: '/', name: 'Home' },
		{ href: '/page', name: 'Pages' },
		{ href: '/upload', name: 'Upload' }
	];
</script>

<nav>
	{#each items as { href, name }}
		<a sveltekit:prefetch {href}>{name}</a>
	{/each}
</nav>

<style>
	nav a {
		margin-right: 10px;
	}
</style>
