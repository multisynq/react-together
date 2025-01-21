import useNicknames from './useNicknames'

export default function useAllNicknames() {
  const [, , allNicknames] = useNicknames()
  return allNicknames
}
