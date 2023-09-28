import type {Project} from '$lib/types/project'

let db: Project[] = [
    {id: '0', name: 'Proj 1', status: 'created', configuration: null},
    {id: '1', name: 'Proj 2', status: 'created', configuration: null},
    {id: '2', name: 'Proj 3', status: 'created', configuration: null},
]

export const getProjects = () => [...db]

export const getProject = (id: string): Project | undefined => {
    return db.find((p) => p.id === id)
}

export const update = (projects: Project[]): void => {
    if (projects !== null && projects !== undefined && projects.length > 0) {
        db = [...projects]
    }
}
