<script lang="ts">
    import '../app.css'
    interface Project {
        id: string
        name: string
    }
    const projects: Project[] = Array(3)
        .fill(null)
        .map((_, i) => ({
            id: `${i + 1}`,
            name: `Проект ${i + 1}`,
        }))

    import {page} from '$app/stores'

    $: id = $page.params.id as string | undefined
</script>

<div class="flex flex-col min-h-screen">
    <nav
        class="bg-primary sticky top-0 left-0 w-full h-14 flex justify-between items-center border-b border-white/20"
    >
        <h1 class="px-3 m-0 font-bold">A/B тестирование</h1>
        <div class="px-3 m-0 font-bold">Контакты</div>
    </nav>
    <div class="w-full flex flex-grow flex-row">
        <nav
            class="w-64 bg-primary border-r border-white/20 flex flex-col justify-start items-center px-3"
        >
            <a href="/" class="side-panel-btn-idle mt-6 mb-4 text-center border-dashed"
                >Новый Проект</a
            >
            {#each projects as project (project.id)}
                <a
                    href={`/projects/${project.id}`}
                    class="my-2 text-left"
                    class:side-panel-btn-selected={project.id === id}
                    class:side-panel-btn-idle={project.id !== id}
                >
                    {project.name}
                </a>
            {/each}
        </nav>
        <div class="w-full">
            <slot />
        </div>
    </div>
</div>
