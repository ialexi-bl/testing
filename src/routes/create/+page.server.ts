import type {Actions} from './$types'
import {createProject} from '$lib/server/database'

export const actions = {
    default: async (event) => {
        const data = await event.request.formData()
        const name = data.get('name') as string | null
        if (name !== null) {
            createProject(name, null)
        }
    },
} satisfies Actions
