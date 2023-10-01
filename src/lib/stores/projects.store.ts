import {readonly, writable} from 'svelte/store'
import type {Project} from '$lib/types/project'

const ProjectsStore = writable<Project[]>([])

export const setProjects = (projects: Project[]) => {
    ProjectsStore.set(projects)
}

export const projects = readonly(ProjectsStore)
