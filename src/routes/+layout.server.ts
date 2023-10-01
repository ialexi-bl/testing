import type {LayoutServerLoad} from './$types'
import {getProjects} from '$lib/server/database'

export const load: LayoutServerLoad = ({cookies}) => {
    let userID = cookies.get('userID')
    if (!userID) {
        userID = crypto.randomUUID()
        cookies.set('userID', userID)
    }
    const projects = getProjects(userID)
    return {projects}
}
