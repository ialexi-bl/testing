import type {Project} from '$lib/types/project'

const db = new Map<string, Project[]>()

export const getProjects = (uuid: string): Project[] => {
    let projects = db.get(uuid)
    if (projects === undefined) {
        projects = []
        db.set(uuid, [])
    }
    return projects
}

export const getUser = (uuid: string | undefined): string => {
    return uuid === undefined ? crypto.randomUUID() : uuid
}

export const getProject = (uuid: string, id: string): Project | undefined => {
    return db.get(uuid)?.find((p) => p.id === id)
}

export const createProject = (
    uuid: string,
    project: Pick<Project, 'name' | 'configuration'>,
): Project[] => {
    const projects = getProjects(uuid)
    db.get(uuid)!.push({
        ...project,
        status: 'created',
        id: `${projects.length}`,
    })
    return getProjects(uuid)
}

export const updateProject = (uuid: string, project: Project): Project[] => {
    const projects = getProjects(uuid)
    const existingProject = projects.find((p) => p.id === project.id)
    const i = existingProject === undefined ? -1 : db.get(uuid)!.indexOf(existingProject)
    if (i !== -1) db.get(uuid)![i] = {...project}
    return getProjects(uuid)
}
