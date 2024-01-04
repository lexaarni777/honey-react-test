import React, { Component } from 'react'
import classes from './IconUser.module.css'
import {NavLink} from 'react-router-dom'
import axios from '../../../axios/axios'




class IconUser extends Component{
    state = {
        userName: null
    }

    async componentDidMount(){
        
         const response = await axios.get('users/' + this.props.userId + '.json')
         console.log(response)
         this.setState({
             userName: 'Error Name'//response.data.userName
         })
    }
    
    
    
    render(){
        const cls = [classes.IconUser,
            'fa fa-user']
        return(
            <React.Fragment>
                <a className={classes.a}>Добро пожаловать {this.state.userName}</a>
            <NavLink
                to={'/UserList'}>
                <i className={cls.join(' ')}
                ></i>  
            </NavLink>
            </React.Fragment>
        )
    }
    
}

export default IconUser