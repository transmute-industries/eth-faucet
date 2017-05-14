import React from 'react'
import Navbar from 'components/common/Navbar'
import SnackbarNotification from 'components/Common/SnackbarNotification'
import classes from './CoreLayout.scss'
import 'styles/core.scss'

import { PropTypes } from 'prop-types'

export const CoreLayout = ({ children }) => (
  <div className={classes.container}>
    <Navbar />
    <div className={classes.children}>
      {children}
      <SnackbarNotification />
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default CoreLayout
