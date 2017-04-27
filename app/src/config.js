// EXAMPLE ONLY! THIS FILE IS USUALLY NOT PART OF GIT TRACKING
// .gitignore skips this at the project level, but it is added for example here

export const firebase = {
  apiKey: "AIzaSyBev_5tS4kmdcgi6LcUhGP3HBP1s5Rl0H8",
  authDomain: "eth-faucet.firebaseapp.com",
  databaseURL: "https://eth-faucet.firebaseio.com",
  projectId: "eth-faucet",
  storageBucket: "eth-faucet.appspot.com",
  messagingSenderId: "686546727130"
}

// Config for react-redux-firebase
// For more details, visit https://prescottprue.gitbooks.io/react-redux-firebase/content/config.html
export const reduxFirebase = {
  userProfile: 'users', // root that user profiles are written to
  enableLogging: false, // enable/disable Firebase Database Logging
  updateProfileOnLogin: false // enable/disable updating of profile on login
  // profileDecorator: (userData) => ({ email: userData.email }) // customize format of user profile
}

export const env = 'development'

export default { firebase, reduxFirebase, env }
