import React, {Component} from 'react'
import classes from './Main.module.css'
import imageMain from './Main.png'

class Main extends Component{
    render(){
        return(
            <div className={classes.Main}>
                <img src={imageMain} alt='main' width='960px'/>
                <div className={classes.Container}>
                    <div className={classes.Description}>
                        <p className={classes.DescriptionP1}>Натуральные Ингредиенты и Отличное Качество</p>
                        <p className={classes.DescriptionP2}>мы предлагем натураьные продукты пчеловодства с высокими 
                        лечебно-восстанавливающими свойствами: без добавок и разнообразных
                        примесей, без применения сахара для кормления пчел</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main