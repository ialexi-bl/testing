import type {RequestHandler} from './$types'
import {error, json} from '@sveltejs/kit'
import {deleteProject} from '$lib/server/database'
export const POST: RequestHandler = async ({request, cookies}) => {
    const uuid = cookies.get('userID')
    if (uuid === undefined)
        throw error(401, {
            message: 'Not authorized',
        })
    const id = await request.json()
    const projects = deleteProject(uuid, id)
    return json({projects}, {status: 201})
}
