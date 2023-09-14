import {error} from '@sveltejs/kit'
import type {PageLoad} from './$types'

export const load: PageLoad = ({params}) => {
    const isValidId = true // TODO: add validation
    if (isValidId)
        return {
            title: `Project ${params.id}`,
        }
    throw error(404, 'Not found')
}
