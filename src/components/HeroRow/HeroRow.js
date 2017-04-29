import React from 'react'
import Navbar from 'containers/Navbar/Navbar'
import classes from './HeroRow.scss'

import { PropTypes } from 'prop-types';

import Particles from 'react-particles-js';
import particles from './particles.json'

import Theme from 'theme'


export const HeroRow = ({ children, renderParticles }) => (
  <div className={classes.container} style={{ color: Theme.palette.primary2Color }}>

    <div className={classes.center}>
      <div className={classes.children}>
        {children}
      </div>
    </div>

    {
      renderParticles ?
        <div className='heroRowParticles'>
          <Particles
            params={{
              particles: particles.particles,
              interactivity: particles.interactivity
            }} />
        </div>
        :
        <div />
    }

  </div>
)

HeroRow.propTypes = {
  children: PropTypes.element.isRequired,
}

export default HeroRow
