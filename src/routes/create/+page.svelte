<script lang="ts">
    import {createProject} from '$lib/stores/projects.store'

    let name = ''
    function submit() {
        createProject(name, null)
    }
</script>

<form on:submit={submit}>
    <label for="name">Project Name</label>
    <input type="text" name="name" bind:value={name} class="text-black" />
    <button type="submit">Submit</button>
</form>
