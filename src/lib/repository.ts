import {setProjects} from '$lib/stores/projects.store'
import type {Project} from '$lib/types/project'

export const syncProjects = () => {
    fetch('/api/projects')
        .then((r) => r.json())
        .then(({projects}) => setProjects(projects))
}

export const createProject = (project: Pick<Project, 'name' | 'configuration'>) => {
    fetch('/api/projects/create', {
        method: 'POST',
        body: JSON.stringify(project),
    })
        .then((r) => r.json())
        .then(({projects}) => setProjects(projects))
}

export const updateProject = (project: Project) => {
    fetch('/api/projects/update', {
        method: 'POST',
        body: JSON.stringify(project),
    })
        .then((r) => r.json())
        .then(({projects}) => setProjects(projects))
}
