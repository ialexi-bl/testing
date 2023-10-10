import Cookies from 'js-cookie'

const COOKIE_NAME = 'X-ABTesting-CSRF-Token'
const HEADER_NAME = 'X-ABTesting-CSRF-Token'

type Options = Omit<RequestInit, 'headers'> & {
    headers?: Record<string, string>
}

export const callApi = (url: RequestInfo | URL, _options?: Options) => {
    const options = {..._options}
    if (['POST', 'DELETE', 'PUT', 'PATCH'].includes(options.method ?? '')) {
        const cookie = Cookies.get(COOKIE_NAME) ?? ''
        options.headers = {
            ...options.headers,
            [HEADER_NAME]: cookie,
        }
    }

    return fetch(url, options)
}
