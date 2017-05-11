import {resolveKeyType} from './utils'

export const getItem = (key) => {
  let resolvedKey = resolveKeyType(key)
  let itemAsString = sessionStorage.getItem(resolvedKey)
  try {
    return JSON.parse(itemAsString)
  } catch (e) {
    return itemAsString
  }
}

export const setItem = (key, value) => {
  let resolvedKey = resolveKeyType(key)
  return sessionStorage.setItem(resolvedKey, JSON.stringify(value))
}
