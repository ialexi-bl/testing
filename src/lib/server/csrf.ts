/**
 * @see {https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#custom-request-headers}
 */
import crypto from 'node:crypto'
import {promisify} from 'node:util'
import {error, type Cookies} from '@sveltejs/kit'

const COOKIE_NAME = 'X-ABTesting-CSRF-Token'
const HEADER_NAME = 'X-ABTesting-CSRF-Token'

const randomBytesAsync = promisify(crypto.randomBytes)
export const setupCsrfToken = async ({cookies}: {cookies: Cookies}) => {
    if (cookies.get(COOKIE_NAME)) {
        return
    }

    const bytes = await randomBytesAsync(64)
    cookies.set(COOKIE_NAME, bytes.toString('hex'), {
        path: '/',
        httpOnly: false,
        maxAge: 7 * 24 * 60 * 60,
    })
}

export const verifyCsrfToken = ({headers, cookies}: {headers: Headers; cookies: Cookies}) => {
    const cookie = cookies.get(COOKIE_NAME)
    const header = headers.get(HEADER_NAME)

    if (!cookie || !header || cookie !== header) {
        throw error(500, 'Invalid CSRF token')
    }
    return true
}
