import React from 'react'
import classes from './Register.module.css'

const Register = props => {
    return(
        <div className={classes.Register}>
        <p 
            onClick={props.onClickProps}>
                Пройти регистрацию
        </p>
        </div>
    )
}

export default Register