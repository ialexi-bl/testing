interface ProjectBase {
    id: string
    name: string
}

interface CreatedProject extends ProjectBase {
    status: 'created'
    configuration: unknown // TODO: add data from creation form here
}

interface StartedProject extends ProjectBase {
    status: 'started'
    configuration: unknown
    data: unknown // TODO: add generated data here
}

export type Project = CreatedProject | StartedProject
