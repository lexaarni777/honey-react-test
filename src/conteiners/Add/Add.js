import React, {Component} from 'react'
import {createControl, validate} from '../../form/formFramework'
import Input from '../../comonents/UI/Input/Input'
import axios from '../../axios/axios'
import Button from '../../comonents/UI/Button/Button'
import ImageUpload from '../../comonents/ImageUpload/ImageUpload'


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
            img: createFormControlsOther('Картинка')
    }
};



class Add extends Component{


    state = {
        formControls: createFormControls(),
        url: 'null'
    };
    
    createProductHandler = event => {
        event.preventDefault()        
        const formControls = {...this.state.formControls}
        const urlImage = this.state.url
        console.log(urlImage)
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
                url: 'null'
            })
        })
        .catch(error => console.log(error))

        
    };

    createUrl = event =>{
        this.setState({
            url: event
        })
        console.log(this.state)
    }

    submitHandler = event => {
        event.preventDafault()
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


    render(){
        return(
            <div>
                <div>
                    <h1>Добавление товара</h1>

                    <form onSubmit={this.submitHandler}>
                        
                        {this.renderInputs()}

                        <ImageUpload
                            name = {this.state.formControls.name.value}
                            onChange = {this.createUrl}

                        />
                        <Button 
                            onClick={this.createProductHandler}
                            url={this.props.children}>
                            Добавить
                        </Button>
                    </form>
                </div>
            </div>
        );
    };
};

export default Add