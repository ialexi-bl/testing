import {readonly, writable} from 'svelte/store'
import type {Project} from '$lib/types/project'

const ProjectsStore = writable<Project[]>([])

export const projects = readonly(ProjectsStore)

export const init = (projects: Project[]) => {
    ProjectsStore.set(projects)
}

export const createProject = (name: string, configuration: unknown) => {
    ProjectsStore.update((projects) => {
        const id = `${projects.length}`
        const status = 'created'
        projects.push({id, name, status, configuration})
        return projects
    })
}
