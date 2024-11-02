export function getUrlSearchParam(url: URL, key: string): string | null {
  return url.searchParams.get(key)
}

export function setUrlSearchParam(url: URL, key: string, value: string) {
  url.searchParams.set(key, value)
}

interface GetUrlHashParamOptions {
  key?: string
  scrub?: boolean
}
export function getUrlHashParam(
  url: URL,
  { key, scrub = false }: GetUrlHashParamOptions = {}
): string | null {
  if (!url.hash) return null

  const hash = url.hash.slice(1)
  if (!hash) return null

  const params = hash.split('&')
  if (key) {
    const keyValue = params.find((param) => param.split('=')[0] === key)
    if (keyValue) {
      const [, ...value] = keyValue.split('=')
      if (scrub) {
        url.hash = params
          .filter((param) => param.split('=')[0] !== key)
          .join('&')
      }
      return value.join('=')
    }
  } else {
    // keyless
    const keylessValue = params.find((param) => !param.includes('='))

    if (keylessValue) {
      if (scrub) {
        url.hash = params.filter((param) => param !== keylessValue).join('&')
      }

      return keylessValue
    }
  }

  return null
}

export function setUrlHashParam(
  url: URL,
  key: string | null,
  value: string | null
): void {
  if (value && value.includes('&')) {
    console.warn(
      `Given value "${value}" contains invalid characters. Trimming until &`
    )
    value = value.split('&')[0]
  }
  const keyless = key === null
  // Get existing parameters
  const hash = url.hash.slice(1)
  const params = hash ? hash.split('&').filter(Boolean) : []

  // Remove existing parameter if present
  const newParams = keyless
    ? params.filter((param) => param.includes('=')) // Remove keyless params
    : params.filter((param) => param.split('=')[0] !== key) // Remove keyed param

  // Add new parameter
  if (value !== null) {
    const newParam = keyless ? value : `${key}=${value}`
    newParams.push(newParam)
  }

  // Update URL hash
  url.hash = newParams.join('&')
}

const SESSION_NAME_PARAM = 'rtName'
const SESSION_PASSWORD_PARAM = 'rtPwd'

interface GetSessionNameFromUrlOptions {
  nameKey?: string
}
export function getSessionNameFromUrl(
  url: URL,
  { nameKey = SESSION_NAME_PARAM }: GetSessionNameFromUrlOptions = {}
): string | null {
  return getUrlSearchParam(url, nameKey)
}

interface GetSessionPasswordFromUrlOptions {
  passwordKey?: string
}
export function getSessionPasswordFromUrl(
  url: URL,
  {
    passwordKey = SESSION_PASSWORD_PARAM
  }: GetSessionPasswordFromUrlOptions = {}
): string | null {
  return getUrlHashParam(url, { key: passwordKey })
}

interface GetJoinUrlOptions {
  nameKey?: string
  passwordKey?: string
}
export function getJoinUrl(
  url: URL,
  name: string,
  password: string,
  {
    nameKey = SESSION_NAME_PARAM,
    passwordKey = SESSION_PASSWORD_PARAM
  }: GetJoinUrlOptions = {}
): URL {
  const result = new URL(url)
  setUrlSearchParam(result, nameKey, name)
  setUrlHashParam(result, passwordKey, password)
  return result
}

interface GetCleanUrlOptions {
  nameKey?: string
  passwordKey?: string
}
export function getCleanUrl(
  url: URL,
  {
    nameKey = SESSION_NAME_PARAM,
    passwordKey = SESSION_PASSWORD_PARAM
  }: GetCleanUrlOptions = {}
): URL {
  const result = new URL(url)
  result.searchParams.delete(nameKey)
  setUrlHashParam(result, passwordKey, null)
  return result
}
