import type {RequestHandler} from './$types'
import {json} from '@sveltejs/kit'
import {getUser, updateProject} from '$lib/server/database'
export const POST: RequestHandler = async ({request, cookies}) => {
    const cachedUserID = cookies.get('userID')
    const uuid = getUser(cachedUserID)
    const {project} = await request.json()
    const projects = updateProject(uuid, project)
    return json({projects}, {status: 201})
}
