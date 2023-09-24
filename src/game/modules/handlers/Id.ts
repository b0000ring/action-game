const ids: {[key: string]: number} = {}

export function get(key: string) {
  if(!ids[key]) {
    ids[key] = 0
  }

  ids[key] += 1

  return `${key}_${ids[key]}`
}