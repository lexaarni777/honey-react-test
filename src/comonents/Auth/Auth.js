import React, { Component } from 'react'
import classes from './Auth.module.css'
import Input from '../UI/Input/Input'
import Backdrop from '../Login/Backdrop/Backdrop'
import {createControl, validate} from '../../form/formFramework'
import Botton from '../UI/Button/Button'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {auth} from '../../store/action/auth'
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

    loginHendler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true,
            this.props.onClose
        )        
    }

    registerHendler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        )
    
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


function mapDispatchToProps(dispatch){
    return{
        auth: (email, password, isLogin, onClose) => dispatch(auth(email, password, isLogin, onClose))
    }
}



export default connect(null, mapDispatchToProps)(Auth)