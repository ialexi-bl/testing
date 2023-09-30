import type {RequestHandler} from './$types'
import {json} from '@sveltejs/kit'
import {createProject, getUser} from '$lib/server/database'
export const POST: RequestHandler = async ({request, cookies}) => {
    const cachedUserID = cookies.get('userID')
    const uuid = getUser(cachedUserID)
    const {name, configuration} = await request.json()
    const projects = createProject(uuid, {name, configuration})
    return json({projects}, {status: 201})
}
