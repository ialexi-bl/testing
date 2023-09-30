import type {LayoutServerLoad} from './$types'
import {getProjects, getUser} from '$lib/server/database'

export const load: LayoutServerLoad = ({cookies}) => {
    const cachedUserID = cookies.get('userID')
    const userID = getUser(cachedUserID)
    if (userID !== cachedUserID) {
        cookies.set('userID', userID)
    }
    const projects = getProjects(userID)
    return {projects}
}
