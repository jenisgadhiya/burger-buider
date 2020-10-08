import React from 'react'

import logo from '../../Assets/images/burger-logo.png'
import classes from './Logo.css'

const Logo=(props)=>(
    <div className={classes.Logo}>
        <img src={logo} alt="burger-logo"/> 
    </div>
)

export default Logo