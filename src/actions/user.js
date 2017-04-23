
export const USER_LOGGED_IN = 'USER_LOGGED_IN'
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT'
export const USER_UPDATED = 'USER_UPDATED'

import Web3 from 'web3'
import { browserHistory } from 'react-router'

import AuthenticationContract from '../../build/contracts/Authentication.json'

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)
const contract = require('truffle-contract')

export function signUpUser(name) {
  return function(dispatch) {
    // Using truffle-contract we create the authentication object.
    const authentication = contract(AuthenticationContract)
    authentication.setProvider(provider)

    // Declaring this for later so we can chain functions on Authentication.
    var authenticationInstance

    // Get current ethereum wallet.
    var coinbase = web3.eth.coinbase;

    authentication.deployed().then(function(instance) {
      authenticationInstance = instance

      // Attempt to sign up user.
      authenticationInstance.signup(name, {from: coinbase})
      .catch(function(result) {
        // If error...
      })
      .then(function(result) {
        // If no error, login user.
        dispatch(loginUser())
      })
    })
  }
}

function userLoggedIn(user) {
    return {
        type: USER_LOGGED_IN,
        payload: user
    }
}

export function loginUser() {
    return function (dispatch) {
        // Using truffle-contract we create the authentication object.
        const authentication = contract(AuthenticationContract)
        authentication.setProvider(provider)

        // Declaring this for later so we can chain functions on Authentication.
        var authenticationInstance

        // Get current ethereum wallet.
        var coinbase = web3.eth.coinbase;

        authentication.deployed().then(function (instance) {
            authenticationInstance = instance

            // Attempt to login user.
            authenticationInstance.login({ from: coinbase })
                .catch(function (result) {
                    // If error, go to signup page.
                    console.log('Wallet ' + coinbase + ' does not have an account!')

                    return browserHistory.push('/login')
                })
                .then(function (result) {
                    // If no error, login user.
                    var userName = web3.toUtf8(result)

                    dispatch(userLoggedIn({ "name": userName }))

                    // Used a manual redirect here as opposed to a wrapper.
                    // This way, once logged in a user can still access the home page.
                    var currentLocation = browserHistory.getCurrentLocation()

                    if ('redirect' in currentLocation.query) {
                        return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
                    }
                    return browserHistory.push('/')
                })
        })
    }
}

function userLoggedOut(user) {
    return {
        type: USER_LOGGED_OUT,
        payload: user
    }
}

export function logoutUser() {
    return function (dispatch) {
        // Logout user.
        dispatch(userLoggedOut())

        // Redirect home.
        return browserHistory.push('/')
    }
}

function userUpdated(user) {
    return {
        type: USER_UPDATED,
        payload: user
    }
}

export function updateUser(name) {
    return function (dispatch) {
        // Using truffle-contract we create the authentication object.
        const authentication = contract(AuthenticationContract)
        authentication.setProvider(provider)

        // Declaring this for later so we can chain functions on Authentication.
        var authenticationInstance

        // Get current ethereum wallet. TODO: Wrap in try/catch.
        var coinbase = web3.eth.coinbase;

        authentication.deployed().then(function (instance) {
            authenticationInstance = instance

            // Attempt to login user.
            authenticationInstance.update(name, { from: coinbase })
                .catch(function (result) {
                    // If error...
                })
                .then(function (result) {
                    // If no error, update user.

                    dispatch(userUpdated({ "name": name }))

                    alert('Name updated!')
                })
        })
    }
}
