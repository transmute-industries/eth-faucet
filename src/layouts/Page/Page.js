import React from 'react'
import classes from './Page.scss'

import { PropTypes } from 'prop-types'

import Particles from 'react-particles-js'
import particles from './particles.json'

import Theme from 'theme'

export const Page = ({ children, renderParticles }) => (
  <div className={classes.container} style={{ color: Theme.palette.primary2Color }}>
    <div className={classes.center}>
      <div className={classes.children}>
        {children}
      </div>
    </div>

    {
      renderParticles &&
        <div className='height100'>
          <Particles
            params={{
              particles: particles.particles,
              interactivity: particles.interactivity
            }} />
        </div>
    }

  </div>
)

Page.propTypes = {
  children: PropTypes.element.isRequired
}

export default Page
