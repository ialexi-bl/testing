import {error} from '@sveltejs/kit'
import type {PageServerLoad} from './$types'
import {getProject, getUser} from '$lib/server/database'

export const load: PageServerLoad = ({params, cookies}) => {
    const cachedUserID = cookies.get('userID')
    const userID = getUser(cachedUserID)
    const project = getProject(userID, params.id)
    if (project !== undefined) return {project}
    throw error(404, 'Not found')
}
