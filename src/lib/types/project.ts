interface ProjectBase {
    id: string
    name: string
}

export interface CreatedProject extends ProjectBase {
    status: 'created'
    configuration: Configuration
}

export interface StartedProject extends ProjectBase {
    status: 'started'
    configuration: Configuration
    data: Data
}

export type Project = CreatedProject | StartedProject

export interface Configuration {
    description: string
    platforms: (typeof platformNames)[number][]
    startDate: string
    endDate: string
    controlGroupSize: number
    testGroupSize: number
    metrics: (typeof metricsNames)[number][]
}

export const platformNames = ['Windows Desktop', 'Mac Desktop', 'Android', 'Iphone'] as const
export const metricsNames = [
    'Конверсия',
    'Средний чек',
    'Вовлеченность',
    'Среднее время',
    'Отказы',
    'Кликабельность',
] as const

export type Data = {
    progress: number
    control: GroupData
    test: GroupData
}

export type GroupData = {
    count: number
    metrics: {name: string; stat: number}[]
}
