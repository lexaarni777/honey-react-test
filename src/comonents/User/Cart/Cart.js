import React, { Component } from 'react'
import classes from './Cart.module.css'
import {NavLink} from 'react-router-dom'




class Cart extends Component{
    state = {
        userName: null
    }

  
    
    
    
    render(){
        const cls = [classes.Cart,
            'fa fa-shopping-cart']
        return(
            <React.Fragment>
                
            <NavLink
                to={'/UserList'}>
                <i className={cls.join(' ')}
                ></i>  
            </NavLink>
            </React.Fragment>
        )
    }
    
}

export default Cart