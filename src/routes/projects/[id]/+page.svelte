<script lang="ts">
    import type {PageData} from './$types'
    export let data: PageData
</script>

<h1>{data.project.id}</h1>
<h1>{data.project.name}</h1>
<h1>{data.project.status}</h1>
