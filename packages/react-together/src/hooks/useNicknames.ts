import { useCallback } from 'react'
import {
  adjectives,
  animals,
  uniqueNamesGenerator
} from 'unique-names-generator'
import useMyId from './useMyId'
import useStateTogetherWithPerUserValues from './useStateTogetherWithPerUserValues'

const LOCAL_STORAGE_KEY = '__rt-nickname'

function defaultDeriveNickname(userId: string) {
  return uniqueNamesGenerator({
    seed: userId,
    dictionaries: [adjectives, animals],
    length: 2,
    separator: ' ',
    style: 'capital'
  })
}

interface UseNicknamesOptions {
  deriveNickname?: (userId: string) => string
}

export default function useNicknames(
  options: UseNicknamesOptions = {}
): [string, (nickname: string) => void, Record<string, string>] {
  const { deriveNickname = defaultDeriveNickname } = options
  const myId = useMyId()
  const [nickname, _setNickname, allNicknames] =
    useStateTogetherWithPerUserValues(
      '__nicknames',
      localStorage.getItem(LOCAL_STORAGE_KEY) ??
        deriveNickname(myId ?? Math.random().toString())
    )

  const setNickname = useCallback(
    (nickname: string) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, nickname)
      _setNickname(nickname)
    },
    [_setNickname]
  )

  return [nickname, setNickname, allNicknames]
}
