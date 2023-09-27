import type {LayoutServerLoad} from './$types'
import {getProjects} from '$lib/server/database'

export const load: LayoutServerLoad = () => {
    const projects = getProjects()
    return {projects}
}
