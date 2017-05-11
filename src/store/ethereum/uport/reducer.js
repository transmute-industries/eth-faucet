import { Constants } from './constants'

export const initialState = {
  profile: null
}

const handlers = {
  [Constants.UPORT_LOGGED_IN]: (state, action) => {
    personalizeForUser(true, action)
    return Object.assign({}, state, {
      profile: action.payload
    })
  },
  [Constants.UPORT_LOGGED_OUT]: (state, action) => {
    personalizeForUser(false, action)
    return Object.assign({}, state, {
      profile: null
    })
  }
}

export const uportReducer = (state = initialState, action) => {
  if (handlers[action.type]) {
    return handlers[action.type](state, action)
  }
  return state
}

var personalizeForUser = (isUserLoggedIn, action) => {
  setTimeout(() => {
    var bannerURL
    var el = document.getElementsByClassName('ti_particles')[0]
    if (isUserLoggedIn) {
      bannerURL = 'https://ipfs.infura.io' + action.payload.banner.contentUrl
    } else {
      bannerURL = 'https://source.unsplash.com/category/nature/1280x1024'
    }
    if (el) {
      el.style['background-image'] = `url("${bannerURL}")`
    }
  }, 1 * 1000)
}
