import {readonly, writable} from 'svelte/store'
import type {Project} from '$lib/types/project'

const ProjectsStore = writable<Pick<Project, 'id' | 'name'>[]>([])

export const setProjects = (projects: Project[]) => {
    ProjectsStore.set(projects.map((p) => ({id: p.id, name: p.name})))
}

export const projects = readonly(ProjectsStore)
