import React, { Component } from 'react'
import classes from './IconCart.module.css'
import {NavLink} from 'react-router-dom'




class IconCart extends Component{
    state = {
        cart: []
    }
    componentDidMount(){
        
    }
 
    
    render(){
        const cls = [classes.IconCart,
            'fa fa-shopping-cart']
        return(
            <React.Fragment>
                
            <NavLink
                to={'/Cart'}>
                <i className={cls.join(' ')}
                ></i>  
            </NavLink>
            </React.Fragment>
        )
    }
    
}

export default IconCart