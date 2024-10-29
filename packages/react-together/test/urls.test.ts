import { beforeEach, describe, expect, test } from '@jest/globals'
import { getUrlHashParam, setUrlHashParam } from '../src/utils/urls'

describe('getUrlHashParam', () => {
  let url: URL

  beforeEach(() => {
    // Reset URL before each test
    url = new URL('https://reacttogether.dev')
  })

  test('returns null for empty hash', () => {
    expect(getUrlHashParam(url, { key: 'test' })).toBeNull()
  })

  test('finds simple key-value pair', () => {
    url.hash = '#key=value'
    expect(getUrlHashParam(url, { key: 'key' })).toBe('value')
  })

  test('finds empty value', () => {
    url.hash = '#key='
    expect(getUrlHashParam(url, { key: 'key' })).toBe('')
  })

  test('finds value with multiple parameters', () => {
    url.hash = '#first=1&key=value&last=3'
    expect(getUrlHashParam(url, { key: 'key' })).toBe('value')
  })

  test('returns null for non-existent key', () => {
    url.hash = '#other=value'
    expect(getUrlHashParam(url, { key: 'key' })).toBeNull()
  })

  test('finds keyless value', () => {
    url.hash = '#keyless&key=value'
    expect(getUrlHashParam(url)).toBe('keyless')
  })

  test('ignores keyless value when looking for a key', () => {
    url.hash = '#keyless'
    expect(getUrlHashParam(url, { key: 'test' })).toBeNull()
  })

  test('scrubs keyed parameter', () => {
    url.hash = '#first=1&key=value&last=3'
    const result = getUrlHashParam(url, { key: 'key', scrub: true })
    expect(result).toBe('value')
    expect(url.hash).toBe('#first=1&last=3')
  })

  test('scrubs keyless parameter', () => {
    url.hash = '#keyless&key=value'
    const result = getUrlHashParam(url, { scrub: true })
    expect(result).toBe('keyless')
    expect(url.hash).toBe('#key=value')
  })

  test('handles multiple equal signs in value', () => {
    url.hash = '#key=value=with=equals'
    expect(getUrlHashParam(url, { key: 'key' })).toBe('value=with=equals')
  })

  test('preserves empty hash after scrubbing last parameter', () => {
    url.hash = '#key=value'
    getUrlHashParam(url, { key: 'key', scrub: true })
    expect(url.hash).toBe('')
  })
})

// overwrite keyless and keyed
describe('setUrlHashParam', () => {
  let url: URL

  beforeEach(() => {
    url = new URL('https://reacttogether.dev')
  })

  test('sets simple key-value pair on empty hash', () => {
    setUrlHashParam(url, 'key', 'value')
    expect(url.hash).toBe('#key=value')
  })

  test('sets keyless value on empty hash', () => {
    setUrlHashParam(url, null, 'keyless')
    expect(url.hash).toBe('#keyless')
  })

  test('updates existing key-value pair', () => {
    url.hash = '#key=old&other=value'
    setUrlHashParam(url, 'key', 'new')
    expect(url.hash).toEqual(expect.stringContaining('key=new'))
    expect(url.hash).toEqual(expect.not.stringContaining('key=old'))
  })

  test('updates existing keyless value', () => {
    url.hash = '#keyless&key=value'
    setUrlHashParam(url, null, 'newValue')
    expect(url.hash).toEqual(expect.stringContaining('newValue'))
    expect(url.hash).toEqual(expect.not.stringContaining('keyless'))
  })

  test('adds new key-value pair to existing hash', () => {
    url.hash = '#existing=value'
    setUrlHashParam(url, 'new', 'value2')
    expect(url.hash).toEqual(expect.stringContaining('new=value2'))
  })

  test('handles empty value', () => {
    setUrlHashParam(url, 'key', '')
    expect(url.hash).toBe('#key=')
  })

  test('when value is null, deletes key from url', () => {
    url.hash = '#key=old'
    setUrlHashParam(url, 'key', null)
    expect(url.hash).toBe('')
  })

  test('when value is null, deletes key from url', () => {
    url.hash = '#old'
    setUrlHashParam(url, null, null)
    expect(url.hash).toBe('')
  })

  test('handles value with special characters', () => {
    setUrlHashParam(url, 'key', 'helloworld')
    expect(url.hash).toBe('#key=helloworld')
  })

  test('preserves other parameters when updating', () => {
    url.hash = '#first=1&second=2&third=3'
    setUrlHashParam(url, 'second', 'new')
    expect(url.hash).toEqual(expect.stringContaining('first=1'))
    expect(url.hash).toEqual(expect.stringContaining('third=3'))
    expect(url.hash).toEqual(expect.stringContaining('second=new'))
  })

  test('removes hash when setting empty keyless value', () => {
    url.hash = '#old'
    setUrlHashParam(url, null, '')
    expect(url.hash).toBe('')
  })

  test('can set multiple parameters sequentially', () => {
    setUrlHashParam(url, 'first', '1')
    setUrlHashParam(url, 'second', '2')
    setUrlHashParam(url, null, 'keyless')
    expect(url.hash).toEqual(expect.stringContaining('first=1'))
    expect(url.hash).toEqual(expect.stringContaining('second=2'))
    expect(url.hash).toEqual(expect.stringContaining('keyless'))
  })
})
