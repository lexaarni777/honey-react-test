import React, {Component} from 'react'
import classes from './Layout.module.css'
import {connect} from 'react-redux'

import MenuBar from '../../comonents/Navigation/MenuBar/MenuBar'
import Footer from '../../comonents/Footer/Footer'


class Layout extends Component{
    render(){
        return(
            <div className={classes.Layout}>
                <MenuBar
                    
                    isAuthenticated={this.props.isAuthenticated}
                    userId={this.props.userId}
                />
               
                <main> 
                    {this.props.children}
                </main>
                <Footer/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        isAuthenticated: !!state.auth.token,
        userId: state.auth.userId
    }
}



export default connect(mapStateToProps)(Layout)