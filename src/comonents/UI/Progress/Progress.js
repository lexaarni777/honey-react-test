import React, {useState} from 'react'
import classes from './Progress.module.css'
import LoaderMin from '../LoaderMin/LoaderMin'
const Procress = props =>{

    const cls = [classes.displayOff]

    console.log(props.isDisplay)
    if(props.isDisplay){
        cls.push(classes.displayOn)
    }else(
        cls.push(classes.displayOff)
    )

    return(
        <div className={cls.join(' ')}>
        {props.value < '100'
        ?<div><LoaderMin/></div>
        :<i class="fa fa-check" aria-hidden="true"></i>
        }
        </div> 
        
    )
}

export default Procress