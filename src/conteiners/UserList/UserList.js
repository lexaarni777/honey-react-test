import React, {Component} from 'react'
import classes from './UserList.module.css'

class UserList extends Component{
    render(){
        return(
            <div className={classes.UserList}>
                <div className={classes.Container}>
                    <div className={classes.Description}>
                       Личный кабинет
                    </div>
                </div>
            </div>
        )
    }
}

export default UserList