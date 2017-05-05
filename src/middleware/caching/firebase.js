import * as firebase from 'firebase'
import {resolveKeyType} from './utils'
const db = firebase.database()
const cachePath = 'public-cache/truffle-contracts/'

export const getItem = async (key) => {
  let resolvedKey = resolveKeyType(key)
  return db.ref(cachePath + resolvedKey)
  .once('value')
  .then((snapshot) => {
    let obj = snapshot.val()
    return obj
  })
}

export const setItem = async (key, value) => {
  let resolvedKey = resolveKeyType(key)
  return db.ref(cachePath + resolvedKey).set(value)
}
