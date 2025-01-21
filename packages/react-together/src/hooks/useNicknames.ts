import { useCallback } from 'react'

import useMyId from './useMyId'
import useReactTogetherContext from './useReactTogetherContext'
import useStateTogetherWithPerUserValues from './useStateTogetherWithPerUserValues'

const LOCAL_STORAGE_KEY = '__rt-nickname'

interface UseNicknamesOptions {
  persistNickname?: boolean
}

export default function useNicknames(
  options: UseNicknamesOptions = {}
): [string, (nickname: string) => void, Record<string, string>] {
  const { persistNickname = false } = options

  const { deriveNickname } = useReactTogetherContext()
  const myId = useMyId() ?? Math.random().toString()

  const initialNickname: string = persistNickname
    ? (localStorage.getItem(LOCAL_STORAGE_KEY) ?? deriveNickname(myId))
    : deriveNickname(myId)

  const [nickname, _setNickname, allNicknames] =
    useStateTogetherWithPerUserValues('__nicknames', initialNickname, {
      // Storing all nicknames in the session so that
      // they are available after users leave the session
      keepValues: true
    })

  const setNickname = useCallback(
    (nickname: string) => {
      if (persistNickname) {
        localStorage.setItem(LOCAL_STORAGE_KEY, nickname)
      }
      _setNickname(nickname)
    },
    [_setNickname, persistNickname]
  )

  return [nickname, setNickname, allNicknames]
}
