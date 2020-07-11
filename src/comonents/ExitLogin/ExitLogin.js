import React from 'react'
import classes from './ExitLogin.module.css'
import { NavLink } from 'react-router-dom'

const ExitLogin = props => {
    const cls = [classes.ExitLogin,
    'fa fa-sign-out']

    return(
        <NavLink
            to='/logout'
        >
            <i className={cls.join(' ')}></i>
        </NavLink> 
    )
}

export default ExitLogin