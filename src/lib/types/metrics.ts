export type MetricsJson = {
    metrics: Metrics
}

export type Metrics = Metric[]

export type Metric = LinearMetric | PieMetric | ColumnMetric | NumberMetric

// Конкретные метрики

export const enum MetricType {
    Linear = 'linear',
    Pie = 'pie',
    Column = 'column',
    Number = 'number',
}

type MetricBase = {
    id: string
    displayName: string
}

type LinearMetric = MetricBase & {
    type: MetricType.Linear
    xUnits?: 'none' | 'datetime'

    data: [x: number, y: number][]
}

type PieMetric = MetricBase & {
    type: MetricType.Pie
    data: Record<string, number>
}

type ColumnMetric = MetricBase & {
    type: MetricType.Column
    data: [category: number | string, value: number][]
}

type NumberMetric = MetricBase & {
    type: MetricType.Number
    data: number
}
