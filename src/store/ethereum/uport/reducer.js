import {
  UPORT_LOGGED_IN,
  UPORT_LOGGED_OUT
} from './actions'

export const initialState = {
  profile: null
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

export const uportReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPORT_LOGGED_IN:
      personalizeForUser(true, action)
      return Object.assign({}, state, {
        profile: action.payload
      })

    case UPORT_LOGGED_OUT:
      personalizeForUser(false, action)
      return Object.assign({}, state, {
        profile: null
      })
    default:
      return state
  }
}
