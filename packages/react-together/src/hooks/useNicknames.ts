import { useCallback } from 'react'

import useMyId from './useMyId'
import useReactTogetherContext from './useReactTogetherContext'
import useStateTogetherWithPerUserValues from './useStateTogetherWithPerUserValues'

const LOCAL_STORAGE_KEY = '__rt-nickname'

export default function useNicknames(): [
  string,
  (nickname: string) => void,
  Record<string, string>
] {
  const { deriveNickname, rememberUsers } = useReactTogetherContext()
  const myId = useMyId() ?? Math.random().toString(36).substring(2, 15)

  const storedNickname = localStorage.getItem(LOCAL_STORAGE_KEY)
  const initialNickname: string =
    rememberUsers && storedNickname !== null
      ? storedNickname
      : deriveNickname(myId)

  const [nickname, _setNickname, allNicknames] =
    useStateTogetherWithPerUserValues('__nicknames', initialNickname, {
      // Storing all nicknames in the session so that
      // they are available even after users leave
      keepValues: true,
      overwriteSessionValue: true
    })

  const setNickname = useCallback(
    (nickname: string) => {
      if (rememberUsers) {
        localStorage.setItem(LOCAL_STORAGE_KEY, nickname)
      }
      _setNickname(nickname)
    },
    [_setNickname, rememberUsers]
  )

  return [nickname, setNickname, allNicknames]
}
