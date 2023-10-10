import {setupCsrfToken, verifyCsrfToken} from '$lib/server/csrf'
import type {Handle} from '@sveltejs/kit'

export const handle: Handle = ({event, resolve}) => {
    const {
        cookies,
        request: {method, headers},
    } = event

    if (['POST', 'DELETE', 'PUT', 'PATCH'].includes(method)) {
        verifyCsrfToken({headers, cookies})
    }
    setupCsrfToken({cookies})

    return resolve(event)
}
