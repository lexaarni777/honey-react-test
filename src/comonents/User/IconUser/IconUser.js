import React from 'react'
import classes from './IconUser.module.css'
import {NavLink} from 'react-router-dom'

const IconUser = props => {
    const cls = [classes.IconUser,
    'fa fa-user']
    
    return(
        <NavLink
            to={'/UserList'}>
            <i className={cls.join(' ')}
            ></i>  
        </NavLink>
    )
}

export default IconUser