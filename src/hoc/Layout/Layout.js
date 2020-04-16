import React, {Component} from 'react'
import classes from './Layout.module.css'

import MenuBar from '../../comonents/Navigation/MenuBar/MenuBar'
import Footer from '../../comonents/Footer/Footer'


class Layout extends Component{
    render(){
        return(
            <div className={classes.Layout}>
                <MenuBar/>
               
                <main> 
                    {this.props.children}
                </main>
                <Footer/>
            </div>
        )
    }
}

export default Layout