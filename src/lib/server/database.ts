import type {Project} from '$lib/types/project'

const db: Project[] = []

export const getProjects = () => [...db]

export const createProject = (name: string, configuration: unknown) => {
    const id = `${getProjects().length + 1}`
    const status = 'created'
    db.push({id, name, status, configuration})
}

export const hasProject = (id: string) => {
    return db.some((p) => p.id === id)
}

export const getProject = (id: string): Project | undefined => {
    return db.find((p) => p.id === id)
}
