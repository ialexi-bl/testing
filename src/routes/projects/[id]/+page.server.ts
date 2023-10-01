import {error} from '@sveltejs/kit'
import type {PageServerLoad} from './$types'
import {getProject} from '$lib/server/database'

export const load: PageServerLoad = ({params, cookies}) => {
    const userID = cookies.get('userID')
    if (userID === undefined) throw error(401, 'Not authorized')
    const project = getProject(userID, params.id)
    if (project !== undefined) return {project}
    throw error(404, 'Not found')
}
