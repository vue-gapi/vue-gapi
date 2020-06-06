export function getObjectCopy(object) {
  return JSON.parse(JSON.stringify(object))
}
