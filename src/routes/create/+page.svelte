<script lang="ts">
    import {createProject} from '$lib/repository'

    let name = ''
    function submit() {
        createProject({name, configuration: null})
    }
</script>

<form on:submit={submit}>
    <label for="name">Project Name</label>
    <input type="text" name="name" bind:value={name} class="text-black" />
    <button type="submit">Submit</button>
</form>
