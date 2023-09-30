import type {LayoutServerLoad} from './$types'
import {getProjects} from '$lib/server/database'

export const load: LayoutServerLoad = ({cookies}) => {
    const cachedUserID = cookies.get('userID')
    const userID = cachedUserID ?? crypto.randomUUID()
    if (userID !== cachedUserID) {
        cookies.set('userID', userID)
    }
    const projects = getProjects(userID)
    return {projects}
}
