import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Router } from 'react-router'
import { Provider } from 'react-redux'

// Theming/Styling
import Theme from '../theme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

// Tap Plugin
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

export default class AppContainer extends Component {
  static childContextTypes = {
    muiTheme: PropTypes.object
  }

  getChildContext = () => (
    {
      muiTheme: getMuiTheme(Theme)
    }
  )

  static propTypes = {
    routes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  render () {
    const { routes, history, store } = this.props
    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={history}>
            {routes}
          </Router>
        </div>
      </Provider>
    )
  }
}
