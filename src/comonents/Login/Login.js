import React from 'react'
import classes from './Login.module.css'

const Auth = props => {
    const cls = [classes.Login,
    'fa fa-user']
    
    return(
        <i className={cls.join(' ')}
        onClick={props.onLogin}
        ></i>  
    )
}

export default Auth