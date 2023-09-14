export type MetricsJson = {
    metrics: Metrics
}

// export type Metrics = Metric[]

export type Metric = LinearMetric | PieMetric | ColumnMetric | NumberMetric

// Конкретные метрики

export enum MetricType {
    linear = 'linear',
    pie = 'pie',
    column = 'column',
    number = 'number',
}

type MetricBase = {
    id: string
    displayName: string
}

type LinearMetric = MetricBase & {
    type: MetricType.linear
    xUnits?: 'none' | 'datetime'

    data: [x: number, y: number][]
}

type PieMetric = MetricBase & {
    type: MetricType.pie
    data: Record<string, number>
}

type ColumnMetric = MetricBase & {
    type: MetricType.linear
    data: [category: number | string, value: number][]
}

type NumberMetric = MetricBase & {
    type: MetricType.number
    data: number
}
