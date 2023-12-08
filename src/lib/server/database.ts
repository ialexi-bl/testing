import type {Project} from '$lib/types/project'

const db = new Map<string, Project[]>()

const updateDb = (uuid: string, cb: (projects: Project[]) => Project[]) => {
    const projects = db.get(uuid) ?? []
    db.set(uuid, cb(projects))
    console.log(`[${new Date().toUTCString()}]`, db.get(uuid))
    return db.get(uuid) as Project[]
}

export const getProjects = (uuid: string): Project[] => {
    return updateDb(uuid, (p) => p)
}

export const getProject = (uuid: string, id: string): Project | undefined => {
    return getProjects(uuid).find((p) => p.id === id)
}

export const createProject = (
    uuid: string,
    project: Pick<Project, 'name' | 'configuration'>,
): Project[] => {
    const projects = getProjects(uuid)
    return updateDb(uuid, (p) =>
        p.concat({
            ...project,
            status: 'created',
            id: `${projects.length}`,
        }),
    )
}

export const updateProject = (uuid: string, project: Project): Project[] => {
    return updateDb(uuid, (projects) =>
        projects.map((p) => (p.id !== project.id ? p : {...project})),
    )
}

export const deleteProject = (uuid: string, id: string) => {
    return updateDb(uuid, (projects) => projects.filter((p) => p.id != id))
}
