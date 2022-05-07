<script lang="ts">
	import { page } from '$app/stores';

	$: action = $page.url.origin + '/api/exports';
</script>

<form method="post" {action} accept=".json,application/json" enctype="multipart/form-data">
	<label for="file">Choose an export to upload</label>
	<input type="file" id="file" name="file" />
	<button>Submit</button>
</form>
