import React, { Component } from 'react'
import classes from './Auth.module.css'
import Input from '../UI/Input/Input'
import Backdrop from '../Login/Backdrop/Backdrop'
import {createControl, validate} from '../../form/formFramework'
import Botton from '../UI/Button/Button'
import {NavLink} from 'react-router-dom'
import axios from 'axios'

import imageLogo from '../Footer/logo.png'


function createFormControls() {
    return{
            email: createFormControlsOther('Email'),
            password: createFormControlsOther('Пароль'),
    }
};

function createFormControlsOther(label){
    return  createControl({
        label: label,
        errorMassege: 'Обязательное поле'
    }, {required: true})
}

class Auth extends Component {

    state = {
        formControls: createFormControls(),
    };

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}
        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
        })
    };

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index)=>{
            const control = this.state.formControls[controlName]

            return(
                <Input
                key={controlName+index}
                label={control.label}
                value={control.value}
                valid={control.valid}
                touched={control.touched}
                errorMassege={control.errorMassege}
                sholdValidate={!!control.validation}
                onChange={event => this.changeHandler(event.target.value, controlName)}
                />
            )

        })
    }

    loginHendler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }

        try{
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4Q5_de3gsjL9Y9cQPOArEqm-n7v7hcN8', authData)

            console.log(response.data)

            

        }catch(e){
            console.log(e)
        }
    }

    registerHendler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
        try{
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA4Q5_de3gsjL9Y9cQPOArEqm-n7v7hcN8', authData)

            console.log(response.data)

            this.setState({
                formControls: createFormControls()
            })
        }catch(e){
            console.log(e)
        }
        
    }

    submitHendler = event => {
        event.preventDefault()
    }

    render(){

            const cls = [classes.Auth]
        
            if(this.props.isOpen){
                cls.push(classes.OpenAuth)
            }else{
                cls.push(classes.CloseAuth)
            }

        return(
            <React.Fragment>
                <div className={cls.join(' ')}>
                    <NavLink to='/'>
                        <img src={imageLogo} width='50px' height='50px' alt='imageLogo'/>
                    </NavLink>
                    <p>Вход</p>
                    <form onSubmit={this.submitHendler}>
                    {this.renderInputs()}
                    <Botton
                        onClick={this.loginHendler}
                        >Войти</Botton>
                    <Botton
                        onClick={this.registerHendler}
                        >Регистрация</Botton>
                    </form>
                </div>
                {this.props.isOpen
                    ?<Backdrop 
                        onClick={this.props.onClose}
                    />
                    :null
                }
            </React.Fragment>
        )
    }
    
}

export default Auth