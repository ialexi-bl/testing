<script lang="ts">
    import {onMount} from 'svelte'
    import {isNil} from 'lodash-es'
    import Chart from 'chart.js/auto'

    export let name: string
    export let controlStat: number
    export let testStat: number

    let chart: Chart

    let canvas: HTMLCanvasElement

    let ctx: CanvasRenderingContext2D

    onMount(() => {
        ctx = canvas.getContext('2d')!
    })

    $: {
        if (!isNil(chart)) chart.destroy()
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Control Group', 'Test Group'],
                datasets: [
                    {
                        label: name,
                        data: [controlStat, testStat],
                        backgroundColor: ['rgba(44, 193, 136, 0.8)', 'rgba(234, 135, 3, 0.8)'],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 14,
                                family: 'Inter, sans-serif',
                            },
                        },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        })
    }
</script>

<canvas bind:this={canvas} />
