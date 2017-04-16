import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './util/wrappers.js'

// Material UI dependency thing
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Layouts
import Faucet from './faucet/Faucet';
import Home from './layouts/Home';
import Dashboard from './layouts/Dashboard';
import SignUp from './containers/SignUpFormContainer';
import Profile from './layouts/Profile';

// Redux Store
import store from './store';

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Home} />
        <Route path="dashboard" component={UserIsAuthenticated(Dashboard)} />
        <Route path="faucet" component={UserIsNotAuthenticated(Faucet)} />
        <Route path="signup" component={UserIsNotAuthenticated(SignUp)} />
        <Route path="profile" component={UserIsAuthenticated(Profile)} />
      </Router>
    </Provider>
  ),
  document.getElementById('root')
);
