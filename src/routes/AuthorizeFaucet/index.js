// import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: '/faucets/:name/authorize-users',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const AuthorizeFaucetPage = require('./AuthorizeFaucetPage').default
      // const reducer = require('./modules/reducer').default

      // injectReducer(store, { key: 'tabs', reducer })

      /*  Return getComponent   */
      cb(null, AuthorizeFaucetPage)

    /* Webpack named bundle   */
    }, 'AuthorizeFaucetPage')
  }
})
