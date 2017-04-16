import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import store from './store';
import routes from './routes';

const history = syncHistoryWithStore(browserHistory, store);

import { loginUser } from './actions/user';
import { getAllFaucets } from './actions/faucet';

function doEverything() {
  return dispatch => Promise.all([
    store.dispatch(getAllFaucets()),
    // store.dispatch(loginUser())
  ]);
}

store.dispatch(doEverything()).then(() => {
  console.log('I did everything!');
});

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
),
  document.getElementById('root')
);
