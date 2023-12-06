import {setProjects} from '$lib/stores/projects.store'
import type {Project} from '$lib/types/project'
import {callApi} from './api'

export const syncProjects = () => {
    callApi('/api/projects')
        .then((r) => r.json())
        .then(({projects}) => setProjects(projects))
}

export const createProject = (project: Pick<Project, 'name' | 'configuration'>) => {
    callApi('/api/projects/create', {
        method: 'POST',
        body: JSON.stringify(project),
    })
        .then((r) => r.json())
        .then(({projects}) => setProjects(projects))
}

export const updateProject = (project: Project) => {
    callApi('/api/projects/update', {
        method: 'POST',
        body: JSON.stringify(project),
    })
        .then((r) => r.json())
        .then(({projects}) => setProjects(projects))
}

export const deleteProject = (id: string) => {
    callApi('/api/projects/delete', {
        method: 'POST',
        body: id,
    })
        .then((r) => r.json())
        .then(({projects}) => setProjects(projects))
}
