<script lang="ts">
	import { filesize } from '$lib/utils/format';

	interface UploadInfo {
		name: string;
		size: number;
		inserted_at: string;
	}

	export let uploads: UploadInfo[];
</script>

<h1>Upload export</h1>

<form method="post" accept=".json,application/json" enctype="multipart/form-data">
	<label for="file">Choose an export to upload</label>
	<input type="file" id="file" name="file" />
	<button>Submit</button>
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
	<tbody>
		{#each uploads as { name, size, inserted_at }}
			<tr>
				<td>{name}</td>
				<td><nobr>{filesize(size)}</nobr></td>
				<td><nobr>{new Date(inserted_at).toDateString()}</nobr></td>
			</tr>
		{/each}
	</tbody>
</table>
