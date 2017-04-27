import React from 'react'
import Navbar from 'containers/Navbar/Navbar'
import classes from './CoreLayout.scss'
import 'styles/core.scss'

import { PropTypes }  from 'prop-types';

export const CoreLayout = ({ children }) => (
  <div className={classes.container}>
    <Navbar />
    <div className={classes.children}>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default CoreLayout
