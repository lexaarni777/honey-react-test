import React, {Component} from 'react'
import {createControl, validate} from '../../form/formFramework'
import Input from '../../comonents/UI/Input/Input'
import axios from '../../axios/axios'
import Button from '../../comonents/UI/Button/Button'
import ImageUpload from '../../comonents/ImageUpload/ImageUpload'
import classes from './Add.module.css'


function createFormControlsOther(label){
    return  createControl({
        label: label,
        errorMassege: 'Обязательное поле'
    }, {required: true})
}


function createFormControls() {
    return{
            name: createFormControlsOther('Наименование товара'),
            description: createFormControlsOther('Описание товара'),
            prise: createFormControlsOther('Стоимость'),
    }
};



class Add extends Component{


    state = {
        formControls: createFormControls(),
        url: 'null',
        onDisplay: false,
        valueName: ''
    };
    
    createProductHandler = event => {
               
        const formControls = {...this.state.formControls}
        const urlImage = this.state.url
        const product = {
            name: formControls.name.value,
            description: formControls.description.value,
            prise: formControls.prise.value,
            img: urlImage
        }
        
        axios.post('/products.json', product)
        .then(() => {
            this.setState({
                formControls: createFormControls(),
                url: 'null',
                onDisplay: false,
                valueName: ''
            })
            event.preventDefault(true)  
        })
        .catch(error => console.log(error))

        
        
    };

    createUrl = event =>{
        this.setState({
            url: event
        })
    }

    onValueName = event =>{
        this.setState({
            valueName: event
        })
    }

    submitHandler = event => {
        event.preventDefault()
    };

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls
        })
    };


    renderInputs(){
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
                ></Input>
            )
        })
    };

    onDisplay = () => {
        this.setState({
            onDisplay: true
        })
    }

    render(){
        return(
            <div className={classes.Add}>
                <div className={classes.Conteiner}>
                    <h1>Добавление товара</h1>

                    <form onSubmit={this.submitHandler}>
                        
                        {this.renderInputs()}

                        <ImageUpload
                            name = {this.state.formControls.name.value}
                            onChange = {this.createUrl}
                            onDisplay = {this.onDisplay}
                            isDisplay = {this.state.onDisplay}
                            valueName = {this.state.valueName}
                            onValueName = {this.onValueName}
                        />
                        <Button 
                            onClick={this.createProductHandler}>
                            Добавить
                        </Button>
                    </form>
                </div>
            </div>
        );
    };
};

export default Add