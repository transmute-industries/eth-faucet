import React from 'react'
import Navbar from 'containers/Navbar/Navbar'
import classes from './Page.scss'

import { PropTypes }  from 'prop-types';

export const Page = ({ children }) => (
  <div className={classes.container}>
    <div className={classes.children}>
      {children}
    </div>
  </div>
)

Page.propTypes = {
  children: PropTypes.element.isRequired
}

export default Page
