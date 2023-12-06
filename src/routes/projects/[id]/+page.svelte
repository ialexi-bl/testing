<script lang="ts">
    import '../../../app.css'
    import BarChart from '$lib/components/BarChart.svelte'
    import {goto} from '$app/navigation'
    import {updateProject, deleteProject} from '$lib/repository'
    import {platformNames, metricsNames} from '$lib/types/project'
    import type {Configuration, CreatedProject, Project, StartedProject} from '$lib/types/project'
    import type {PageData} from './$types'
    import {generate} from '$lib/utils/generate'
    import {projects} from '$lib/stores/projects.store'
    export let data: PageData

    // common
    let title: string
    let status: Project['status']
    let description: string
    let id: string
    let project: Project

    // configuration
    let platforms: {name: Project['configuration']['platforms'][number]; selected: boolean}[]
    let startDate: string
    let endDate: string
    let controlGroupSize: number
    let metrics: {name: Project['configuration']['metrics'][number]; selected: boolean}[]

    // test results
    let participants: number
    let progress: number
    let chosenPlatforms: Project['configuration']['platforms']
    let chosenMetrics: string[]
    let testMetrics: StartedProject['data']['test']['metrics']
    let controlMetrics: StartedProject['data']['control']['metrics']

    $: {
        const projectFromStore = $projects.find((p) => p.id === data.project.id)!
        project = projectFromStore
        id = project.id
        switch (project.status) {
            case 'created':
                reassignConfiguration(project)
                break
            case 'started':
                reassignTestingResults(project)
                break
        }
    }

    function reassignConfiguration(project: CreatedProject) {
        title = project.name
        status = project.status
        description = project.configuration.description
        platforms = platformNames.map((name) => ({
            name,
            selected: project.configuration.platforms.includes(name),
        }))
        startDate = project.configuration.startDate
        endDate = project.configuration.endDate
        controlGroupSize = project.configuration.controlGroupSize
        metrics = metricsNames.map((name) => ({
            name,
            selected: project.configuration.metrics.includes(name),
        }))
    }

    function reassignTestingResults(project: StartedProject) {
        title = project.name
        status = project.status
        participants = project.data.test.count + project.data.control.count
        description = project.configuration.description
        progress = project.data.progress
        chosenPlatforms = project.configuration.platforms
        chosenMetrics = project.configuration.metrics.map((m) => {
            switch (m) {
                case 'Вовлеченность':
                case 'Кликабельность':
                case 'Конверсия':
                    return `${m} (%)`
                case 'Отказы':
                    return `${m} (чел.)`
                case 'Среднее время':
                    return `${m} (мин.)`
                case 'Средний чек':
                    return `${m} ($)`
            }
        })
        testMetrics = project.data.test.metrics
        controlMetrics = project.data.control.metrics
    }

    function onDelete() {
        goto('/', {replaceState: false})
        deleteProject(id)
    }

    function onPlatformClick(index: number) {
        platforms[index].selected = !platforms[index].selected
        platforms = platforms
    }

    function onSave() {
        const name = title || `project#${crypto.randomUUID().slice(0, 4)}`
        const configuration: Configuration = {
            description: description || 'Nobody here but us chickens...',
            platforms: platformNames.filter((_, i) => platforms[i].selected),
            startDate: startDate || new Date(Date.now()).toISOString().split('T')[0],
            endDate:
                endDate || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            controlGroupSize,
            testGroupSize: 100 - controlGroupSize,
            metrics: metricsNames.filter((_, i) => metrics[i].selected),
        }
        updateProject({
            id: data.project.id,
            status: 'created',
            name,
            configuration,
        })
    }

    function onStartTesting() {
        updateProject({
            id: project.id,
            configuration: project.configuration,
            name: project.name,
            status: 'started',
            data: generate(project.configuration),
        })
        refresh()
    }

    function onChange() {
        updateProject({
            id: project.id,
            status: 'created',
            name: project.name,
            configuration: project.configuration,
        })
    }

    function refresh() {
        const thisPage = window.location.pathname

        goto('/loading').then(() => {
            setTimeout(() => goto(thisPage), 200)
        })
    }
</script>

<svelte:head>
    <link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" />
</svelte:head>

<main
    class="text-white font-medium w-full min-h-full gap-2 flex flex-grow flex-col justify-start items-start"
>
    {#if status === 'created'}
        <section class="flex flex-row justify-between items-center w-full p-3">
            <input
                type="text"
                bind:value={title}
                placeholder="Untitled"
                class="block border rounded border-white/20 min-w-64 w-1/2 py-2 px-2 bg-transparent text-4xl focus:ring-blue-500 focus:border-blue-500"
            />
            <button on:click={onDelete} class="rounded bg-control-delete py-1 px-2">Удалить</button>
        </section>
        <section class="flex flex-col w-full p-3">
            <label for="description" class="block mb-2 text-xl text-gray-900 dark:text-white"
                >Описание</label
            >
            <textarea
                id="description"
                rows="4"
                bind:value={description}
                class="block p-2.5 min-w-64 w-full text-sm bg-transparent rounded-lg border border-white/20 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Описание проекта..."
            />
        </section>
        <section class="flex flex-col w-full p-3">
            <h1 class="text-xl">Платформа</h1>
            <div class="mt-3 flex flex-row justify-between w-full">
                {#each platforms as platform, i}
                    <button
                        class:bg-transparent={!platform.selected}
                        class:platform-not-selected={!platform.selected}
                        class:bg-control-primary={platform.selected}
                        class:platform-selected={platform.selected}
                        class="border rounded py-1 px-5 transition ease-in-out duration-100"
                        on:click={() => onPlatformClick(i)}>{platform.name}</button
                    >
                {/each}
            </div>
        </section>
        <section class="flex flex-col w-full p-3">
            <h1 class="text-xl">Продолжительность</h1>
            <div class="mt-3 flex flex-row justify-start w-full">
                <input
                    class="block border rounded border-white/20 w-44 py-2 px-2 bg-transparent"
                    type="date"
                    bind:value={startDate}
                />
                <div class="p-2 font-bold text-xl">→</div>
                <input
                    class="block border rounded border-white/20 w-44 py-2 px-2 bg-transparent"
                    type="date"
                    bind:value={endDate}
                />
            </div>
        </section>
        <section class="lex flex-col w-full p-3">
            <h1 class="text-xl">Выбор группы</h1>
            <div class="py-2 w-[25rem]">
                <input
                    type="range"
                    min="1"
                    max="99"
                    bind:value={controlGroupSize}
                    class="w-full h-2 bg-primary rounded-lg appearance-none cursor-pointer"
                />
            </div>
            <div class="mt-3 flex flex-row justify-start w-full gap-12">
                <div
                    class="h-24 w-44 bg-primary rounded-lg flex flex-col justify-center items-center"
                >
                    <h2 class="">Control Group</h2>
                    <p class="text-4xl text-blue-500 mt-1">{controlGroupSize}%</p>
                </div>
                <div
                    class="h-24 w-44 bg-primary rounded-lg flex flex-col justify-center items-center"
                >
                    <h2 class="">Test Group</h2>
                    <p class="text-4xl text-blue-500 mt-1">{100 - controlGroupSize}%</p>
                </div>
            </div>
        </section>
        <section class="flex flex-col w-full p-3">
            <h1 class="text-xl">Метрики</h1>
            <div class="mt-3 grid grid-cols-3">
                {#each metrics as metric, i}
                    <div class="flex flex-row py-1">
                        <i
                            class="text-sm flex justify-center items-center mi-circle-information mr-1"
                        />
                        <p class="w-36">{metric.name}</p>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                class="sr-only peer"
                                bind:checked={metric.selected}
                            />
                            <div
                                class="w-8 h-3 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0.25rem] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                            />
                        </label>
                    </div>
                {/each}
            </div>
        </section>
        <section class="flex items-center justify-center p-3 mb-4 w-full gap-8">
            <button on:click={onSave} class="bg-control-primary rounded py-2 px-10"
                >СОХРАНИТЬ</button
            >
            <button on:click={onStartTesting} class="bg-control-primary rounded py-2 px-10"
                >НАЧАТЬ ТЕСТИРОВАНИЕ</button
            >
        </section>
    {:else}
        <section class="flex flex-row justify-between items-start w-full p-3">
            <div>
                <h1 class="text-4xl">{title}</h1>
                <h2 class="text-2xl text-white/40">{participants} пользователей</h2>
            </div>
            <div class="flex flex-row gap-3">
                <button on:click={onStartTesting} class="rounded bg-control-primary py-1 px-2"
                    >Повторить</button
                >
                <button on:click={onChange} class="rounded bg-control-primary py-1 px-2"
                    >Изменить</button
                >
                <button on:click={onDelete} class="rounded bg-control-delete py-1 px-2"
                    >Удалить</button
                >
            </div>
        </section>
        <section class="flex flex-row items-start w-full p-3">
            <p>{description}</p>
        </section>
        <section class="grid grid-cols-2 gap-10 w-full py-3 px-8">
            <div class="rounded border flex flex-col border-white/20 bg-primary py-4 px-3">
                Прогресс
                <div class="h-14 w-full flex flex-row gap-8">
                    <div class="flex w-full items-center justify-center">
                        <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div
                                class="bg-blue-600 h-2.5 rounded-full"
                                style={`width: ${progress}%`}
                            />
                        </div>
                    </div>
                    <div class="flex justify-center items-center pr-4">
                        {progress}%
                    </div>
                </div>
            </div>
            <div class="rounded border flex flex-col border-white/20 bg-primary py-4 px-3">
                Конфигурация
                <div class="h-14 w-full flex flex-row items-center justify-start">
                    <span class="pt-[0.30rem]"><i class="text-2xl mr-3 mi-computer" /></span>
                    <span class="flex justify-center items-center"
                        >{chosenPlatforms.join(', ') || 'All'}</span
                    >
                </div>
            </div>
        </section>
        <section
            class="flex border-t mt-4 border-white/20 flex-col items-start justify-start w-full flex-grow bg-primary py-4 px-6"
        >
            <div>
                <h1 class="text-2xl">Аналитика по результатам тестирования</h1>
            </div>
            <div class="w-full grid grid-cols-2 mt-5 gap-8">
                {#each chosenMetrics as metric, i}
                    <div class="rounded border py-2 px-3 border-white/20">
                        <p>{metric}</p>
                        <BarChart
                            name={metric}
                            controlStat={controlMetrics[i].stat}
                            testStat={testMetrics[i].stat}
                        />
                    </div>
                {/each}
            </div>
        </section>
    {/if}
</main>

<style lang="postcss">
    .platform-selected {
        @apply border-blue-600;
    }
    .platform-not-selected {
        @apply border-white/20;
    }
</style>
