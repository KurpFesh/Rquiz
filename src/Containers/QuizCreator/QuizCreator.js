import React, {Component} from 'react';
import classes from './QuizCreator.css';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Button from '../../Components/UI/Button/Button';
import Input from '../../Components/UI/Input/Input';
import {createControl} from '../../Form/FormFramework';

function createOptionControl(number){
    return createControl({
        label: `Вариант ${number}`,
        errorMessage: "Значение не может быть пустым"
    }, {required: true});
}

function createFormControls(){
    return {
        question: createControl({
            label: "Введите вопрос",
            errorMessage: "Вопрос не может быть пустым"
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

export default class QuizCreator extends Component{
    state = {
        quiz: [],
        formControls: createFormControls() 
    }

    submitHandler = event => {
        event.preventDefault();
    }

    addQuestionHandler = () => {

    }

    createQuizHandler = () => {

    }

    changeHandler = (value, controlName) => {

    }

    renderControls(){
        return Object.keys(this.state.formControls).map( (controlName, index) => {
            const control = this.state.formControls[controlName];

            return (
                <Auxiliary key = {controlName + index}>
                    <Input 
                        label = {control.label}
                        value = {control.value}
                        valid = {control.valid}
                        shouldValidate = {!!control.validate}
                        touched = {control.touched}
                        errorMessage = {control.errorMessage}
                        onChange = {event => this.submitHandler.changeHandler(event.target.value, controlName)}
                    />
                    { index === 0 ? <hr /> : null}
                </Auxiliary>
            )
        });
    }

    render(){
        return(
            <div className = {classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>

                    <form onSubmit = {this.submitHandler}>

                        { this.renderControls() }

                        <select></select>

                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                        >
                            Добавить вопрос
                        </Button>

                        <Button
                            type="success"
                            onClick={this.createQuizHandler}
                        >
                            Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

