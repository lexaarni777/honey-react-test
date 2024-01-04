import React, {useState} from 'react'
import classes from './Progress.module.css'
import LoaderMin from '../LoaderMin/LoaderMin'
const Procress = props =>{

    const cls = [classes.displayOff]

    if(props.isDisplay){
        cls.push(classes.displayOn)
    }else(
        cls.push(classes.displayOff)
    )

    return(
        <div className={cls.join(' ')}>
        {props.value < '100'
        ?<div><LoaderMin/></div>
        :<i className="fa fa-check" aria-hidden="true"></i>
        }
        </div> 
        
    )
}

export default Procress