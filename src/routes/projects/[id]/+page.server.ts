import {error} from '@sveltejs/kit'
import type {PageServerLoad} from './$types'
import {getProject} from '$lib/server/database'

export const load: PageServerLoad = ({params}) => {
    const project = getProject(params.id)
    if (project !== undefined) return {project}
    throw error(404, 'Not found')
}
