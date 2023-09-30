import type {RequestHandler} from './$types'
import {json} from '@sveltejs/kit'
import {getProjects, getUser} from '$lib/server/database'
export const GET: RequestHandler = async ({cookies}) => {
    const cachedUserID = cookies.get('userID')
    const uuid = getUser(cachedUserID)
    const projects = getProjects(uuid)
    return json({projects}, {status: 201})
}
