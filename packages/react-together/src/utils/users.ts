import {
  adjectives,
  animals,
  uniqueNamesGenerator
} from 'unique-names-generator'

export function deriveNickname(userId: string) {
  return uniqueNamesGenerator({
    seed: userId,
    dictionaries: [adjectives, animals],
    length: 2,
    separator: ' ',
    style: 'capital'
  })
}
