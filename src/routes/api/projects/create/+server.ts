import type {RequestHandler} from './$types'
import {error, json} from '@sveltejs/kit'
import {createProject} from '$lib/server/database'
export const POST: RequestHandler = async ({request, cookies}) => {
    const uuid = cookies.get('userID')
    if (uuid === undefined)
        throw error(401, {
            message: 'Not authorized',
        })
    const {name, configuration} = await request.json()
    const projects = createProject(uuid, {name, configuration})
    return json({projects}, {status: 201})
}
