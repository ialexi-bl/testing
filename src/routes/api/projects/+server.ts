import type {RequestHandler} from './$types'
import {update} from '$lib/server/database'
import type {Project} from '$lib/types/project'
import {json} from '@sveltejs/kit'
export const POST: RequestHandler = async ({request}) => {
    const projects = await request.json()
    update(projects as Project[])
    return json({}, {status: 201})
}
