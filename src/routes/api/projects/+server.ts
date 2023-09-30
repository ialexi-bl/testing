import type {RequestHandler} from './$types'
import {error, json} from '@sveltejs/kit'
import {getProjects} from '$lib/server/database'
export const GET: RequestHandler = async ({cookies}) => {
    const uuid = cookies.get('userID')
    if (uuid === undefined)
        throw error(401, {
            message: 'Not authorized',
        })
    const projects = getProjects(uuid)
    return json({projects}, {status: 201})
}
