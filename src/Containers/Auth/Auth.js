import React, {Component} from 'react';
import classes from './Auth.css';
import Button from'../../Components/UI/Button/Button';
import Input from'../../Components/UI/Input/Input';

function validateEmail(email){
    const reg = /.+@.+\..+/;
    return reg.test(String(email).toLowerCase());
}

export default class Auth extends Component{
    state = {
        isFormValid: false, 
        formControls: {
            email: {
                value: "",
                type: 'email',
                label: "Email",
                errorMessage: "Введите корректный Email",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },

            password: {
                value: "",
                type: 'password',
                label: "Пароль",
                errorMessage: "Введите корректный пароль",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler = () => {

    }

    registerHandler = () => {

    }

    submitHandler = event => {
        event.preventDefault();
    }

    renderInputs = () => {
        return Object.keys(this.state.formControls).map( (controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input 
                    key = {controlName + index}
                    type = {control.type}
                    value = {control.value}
                    valid = {control.valid}
                    touched = {control.touched}
                    label = {control.label}
                    shouldValidate = {!!control.validation}
                    errorMessage = {control.errorMessage}
                    onChange = { event => this.onChangeHandler(event, controlName) }
                />
            );
        });
    }

    validateControl(value, validation){
        if(!validation){
            return true;
        }

        let isValid = true;

        if(validation.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(validation.minLength){
            isValid = value.length >= validation.minLength && isValid;
        }
        if(validation.email){
            isValid = validateEmail(value) && isValid;
        }

        return isValid;
    }

    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.touched = true;
        control.value = event.target.value;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;
        Object.keys(formControls).forEach( name => {
            isFormValid = formControls[name].valid && isFormValid;
        });

        this.setState({
            formControls, isFormValid
        });
    }

    render(){
        return(
            <div className = {classes.Auth}>
                <div>
                    <h1>Auth</h1>

                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>

                        { this.renderInputs() }

                        <Button 
                            type="success" 
                            onClick={this.loginHandler} 
                            disabled={!this.state.isFormValid}
                        >
                            Войти
                        </Button>
                        <Button 
                            type="primary" 
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Зарегистрироваться
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

