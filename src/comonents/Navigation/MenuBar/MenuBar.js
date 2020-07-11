import React, {Component} from 'react';
import classes from './MenuBar.module.css';
import {NavLink} from 'react-router-dom'
import Auth from '../../../comonents/Auth/Auth'
import Login from '../../../comonents/Login/Login'
import {connect} from 'react-redux'
import ExitLogin from '../../ExitLogin/ExitLogin'

import imageLogo from '../../Footer/logo.png'

const links = [
    {to: '/', label: 'Главная', exect: true},
    {to: '/about', label: 'О нас', exect: false},
    {to: '/products', label: 'Продукция', exect: false},
    {to: '/delivery', label: 'Доставка и оплата', exect: false},
    {to: '/articles', label: 'Статьи', exect: false},
    {to: '/contact', label: 'Контакты', exect: false},
];

class MenuBar extends Component {
    state = {
        auth: false
    }


    renderLinks(){
        return links.map((link, index) => {
           return(
           <li key={index}>
               <NavLink
                    to={link.to}
                    exact={link.exect}               
               >
                    {link.label}
               </NavLink>
           </li>
           ) 
        })
    };

    onLoginAuthHandler = () => {
        this.setState({
            auth: !this.state.auth
        })
    }

    render(){
        return(
            <header className={classes.MenuBar}>
                <div className={classes.Container}>
                    <div className={classes.Auth}>
                        <div className={classes.BarLeft}>
                            <NavLink to='/'>
                                <img src={imageLogo} width='50px' height='50px' alt='imageLogo'/>
                            </NavLink>
                        </div>
                        <div className={classes.BarRight}>
                            <Auth 
                                isOpen={this.state.auth}//если нажимаем на login значение меняется
                                onClose={this.onLoginAuthHandler}
                                />
                            <Login
                                onLogin={this.onLoginAuthHandler}
                                isAuthenticated={this.props.isAuthenticated}
                            />
                            {this.props.isAuthenticated?
                                <ExitLogin
                                    isAuthenticated={this.props.isAuthenticated}>  
                                </ExitLogin>
                                :null
                            }
                            
                        </div>
                    </div>
                    <nav>
                        <ul>
                            {this.renderLinks()}
                        </ul>
                    </nav>
                </div>
            </header>
        )
    };
}

function mapStateToProps(state){
    return{
        isAuthenticated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(MenuBar);