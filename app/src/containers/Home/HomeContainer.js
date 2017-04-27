import React, { Component } from 'react'
import { PropTypes }  from 'prop-types';
import { connect } from 'react-redux'
import { map } from 'lodash'
import Theme from 'theme'
import {
  firebaseConnect,
  isLoaded,
  pathToJS,
  dataToJS,
  // orderedToJS,
  // populatedDataToJS
} from 'react-redux-firebase'

import NewTodoPanel from 'components/NewTodoPanel'
import classes from './HomeContainer.scss'

import Particles from 'react-particles-js';
import particles from './particles.json'

@firebaseConnect([
  // 'todos' // sync full list of todos
  // { path: '/projects', type: 'once' } // for loading once instead of binding
  { path: 'todos', queryParams: ['limitToFirst=20'] } // limit to first 20
  // { path: 'todos', queryParams: ['limitToFirst=20'], populates } // populate
  // { path: 'todos', queryParams: ['orderByChild=text'] }, // list todos alphabetically
])
@connect(
  ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
    todos: dataToJS(firebase, 'todos')
    // todos: populatedDataToJS(firebase, '/todos', populates), // if populating
    // todos: orderedToJS(firebase, 'todos'), // if using ordering such as orderByChild
  })
)
export default class Home extends Component {

  render() {
  
    return (
      <div className={classes.container} style={{ color: Theme.palette.primary2Color }}>
       
        <Particles className={classes.particles} params={{
          particles: particles.particles,
          interactivity: particles.interactivity
        }} />

      </div>
    )
  }
}
