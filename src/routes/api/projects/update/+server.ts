import type {RequestHandler} from './$types'
import {error, json} from '@sveltejs/kit'
import {updateProject} from '$lib/server/database'
export const POST: RequestHandler = async ({request, cookies}) => {
    const uuid = cookies.get('userID')
    if (uuid === undefined)
        throw error(401, {
            message: 'Not authorized',
        })
    const {project} = await request.json()
    const projects = updateProject(uuid, project)
    return json({projects}, {status: 201})
}
