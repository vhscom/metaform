<script lang="ts">
	import { enhance } from '$app/forms';
	import { filesize } from '$lib/utils/format';
	import type { ActionData, PageData } from './$types';

	export let form: ActionData;
	export let data: PageData;

	$: ({ uploads } = data);
</script>

<h1>Upload export</h1>

<!-- <form
	method="post"
	enctype="multipart/form-data"
	use:enhance={({ formElement, formData, action, cancel, submitter }) => {
		// `formElement` is this `<form>` element
		// `formData` is its `FormData` object that's about to be submitted
		// `action` is the URL to which the form is posted
		// calling `cancel()` will prevent the submission
		// `submitter` is the `HTMLElement` that caused the form to be submitted

		const file = new FormData(formElement).get('file');
		// @ts-ignore: File is a POJO in a Cloudflare worker
		const { name, lastModified, size, type } = file;
		console.debug({ name, lastModified, size, type });

		// const formData = await formElement.formData();
		// const file = formData.get('file') as File;

		return async ({ result, update }) => {
			// `result` is an `ActionResult` object
			console.debug({ result });
			// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
			update();
		};
	}}
> -->
<form method="post" enctype="multipart/form-data" use:enhance>
	<label for="file">Choose an export to upload</label>
	<input type="file" accept=".json,application/json" id="file" name="file" />
	<button>Upload</button>
	{#if form?.cf}<p class="debug">{form.cf}</p>{/if}
	{#if form?.success}<p class="success">Upload successful.</p>{/if}
	{#if form?.missing}<p class="error">File is required.</p>{/if}
	<!-- {#if form?.empty}<p class="error">File cannot be empty.</p>{/if} -->
	{#if form?.failed}<p class="error">File upload failed.</p>{/if}
</form>

<h2>Latest uploads</h2>
<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Size</th>
			<th>Uploaded on</th>
		</tr>
	</thead>
	{#if uploads?.length}
		<tbody>
			{#each uploads as { name, size, inserted_at }}
				<tr>
					<td>{name}</td>
					<td><nobr>{filesize(size)}</nobr></td>
					<td><nobr>{new Date(inserted_at).toDateString()}</nobr></td>
				</tr>
			{/each}
		</tbody>
	{:else}
		<tbody>
			<tr>
				<td rowspan="3">Upload a Logseq export JSON file to get started.</td>
			</tr>
		</tbody>
	{/if}
</table>

<style>
	button:focus-visible {
		background-color: #073642;
		border: 1px solid #839496;
		color: #839496;
	}
</style>
