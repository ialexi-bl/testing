<script lang="ts">
    import '../../app.css'
    import {goto} from '$app/navigation'
    import {createProject} from '$lib/repository'
    import type {Configuration} from '$lib/types/project'

    let title = ''

    function onDelete() {
        goto('/', {replaceState: false})
    }

    let description = ''

    const platformNames = ['Windows Desktop', 'Mac Desktop', 'Android', 'Iphone'] as const
    let platforms = platformNames.map((name) => ({
        name,
        selected: false,
    }))
    function onPlatformClick(index: number) {
        platforms[index].selected = !platforms[index].selected
        platforms = platforms
    }

    let startDate = new Date(Date.now()).toISOString().split('T')[0]
    let endDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]

    let controlGroupSize = 50

    const metricsNames = [
        'Конверсия',
        'Средний чек',
        'Вовлеченность',
        'Среднее время',
        'Отказы',
        'Кликабельность',
    ] as const
    let metrics = metricsNames.map((name) => ({
        name,
        selected: false,
    }))

    function onSubmit() {
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
        createProject({name, configuration})
    }

    $: console.log(startDate)
</script>

<svelte:head>
    <link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" />
</svelte:head>

<main
    class="text-white font-medium w-full min-h-full gap-2 flex flex-grow flex-col justify-start items-start"
>
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
            class="block p-2.5 w-full text-sm bg-transparent rounded-lg border border-white/20 focus:ring-blue-500 focus:border-blue-500"
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
            <div class="h-24 w-44 bg-primary rounded-lg flex flex-col justify-center items-center">
                <h2 class="">Control Group</h2>
                <p class="text-4xl text-blue-500 mt-1">{controlGroupSize}%</p>
            </div>
            <div class="h-24 w-44 bg-primary rounded-lg flex flex-col justify-center items-center">
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
    <section class="flex items-center justify-center p-3 mb-4 w-full">
        <button on:click={onSubmit} class="bg-control-primary rounded py-2 px-10">СОЗДАТЬ</button>
    </section>
</main>

<style lang="postcss">
    .platform-selected {
        @apply border-blue-600;
    }
    .platform-not-selected {
        @apply border-white/20;
    }
</style>
