import type {Configuration, Data, GroupData} from '$lib/types/project'

export function generate(configuration: Configuration): Data {
    const userCount = Math.floor(Math.random() * 10_000_000)
    const progress = percentage()
    const [controlUserCount, testUserCount] = separate(
        userCount,
        Math.floor(configuration.controlGroupSize / 10) / 10,
    )
    return {
        progress,
        control: {
            count: controlUserCount,
            metrics: metrics(controlUserCount, configuration.metrics),
        },
        test: {
            count: testUserCount,
            metrics: metrics(testUserCount, configuration.metrics),
        },
    }
}

function separate(total: number, initial = 0.5): [number, number] {
    let a = Math.floor(total * (initial + Math.random() / 10))
    if (a >= total) {
        a = total - Math.floor((total * 2) / 100)
    }
    return [a, total - a]
}

function percentage() {
    return Math.floor(Math.random() * 100)
}

function sample(total: number) {
    return Math.ceil(Math.random() * total)
}

function time() {
    const hours = Math.round(Math.random() * 24)
    const minutes = Math.round(Math.random() * 60)
    return hours * 60 + minutes
}

function money() {
    return Math.round(Math.random() * 20)
}

function metrics(total: number, metrics: Configuration['metrics']): GroupData['metrics'] {
    return metrics.map((metric) => {
        switch (metric) {
            case 'Вовлеченность':
                return {name: metric, stat: percentage()}
            case 'Кликабельность':
                return {name: metric, stat: percentage()}
            case 'Конверсия':
                return {name: metric, stat: percentage()}
            case 'Отказы':
                return {name: metric, stat: sample(total)}
            case 'Среднее время':
                return {name: metric, stat: time()}
            case 'Средний чек':
                return {name: metric, stat: money()}
        }
    })
}
