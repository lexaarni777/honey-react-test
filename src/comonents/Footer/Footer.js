import React, {Component} from 'react'
import classes from './Footer.module.css'

import {NavLink} from 'react-router-dom'

import imageLogo from './logo.png'
import imageInstagram from './instagram.png'

class Footer extends Component{
    render(){
        return(
        <div className={classes.Footer}>
            <div className={classes.Conteiner}>
                <div className={classes.FooterLeft}>
                    <NavLink to='/'>
                        <img src={imageLogo} width='50px' height='50px' alt='imageLogo'/>
                    </NavLink>
                    <p>Добрый мед</p>
                </div>
                <div className={classes.FooterCenter}>
                    <p>+7-927-508-63-68</p>
                    <p>honey178@honey.ru</p>
                </div>
                <div className={classes.FooterRight}>
                    <p>Мы в соцсетях:</p>
                    <a href='https://www.instagram.com/medok178/'>
                        <img src={imageInstagram} width='30px' alt='imageInstagram'/>
                    </a>
                </div>
            </div> 
        </div>
        )
    }
}

export default Footer