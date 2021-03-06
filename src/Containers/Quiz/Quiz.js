import React, {Component} from 'react';
import classes from './Quiz.css';
import ActiveQuiz from '../../Components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../Components/FinishedQuiz/FinishedQuiz';

export default class Quiz extends Component{
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                id: 1,
                question: 'Какого цвета небо?',
                rightAnswerId: 2,
                answers: [
                    { id: 1, text: 'Чёрный' },
                    { id: 2, text: 'Синий' },
                    { id: 3, text: 'Красный' },
                    { id: 4, text: 'Зелёный' }
                ]
            },
            {
                id: 2,
                question: 'В каком году был основан Санкт-Петербург?',
                rightAnswerId: 3,
                answers: [
                    { id: 1, text: '1700' },
                    { id: 2, text: '1705' },
                    { id: 3, text: '1703' },
                    { id: 4, text: '1803' }
                ]
            }
        ]
    }

    isQuizFinished = () => {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    onAnswerClickHandler = answerId => {
        if(this.state.answerState) {
            const key = Object.keys(this.state.answerState);
            if(this.state.answerState[key] === 'success'){
                return;
            }
        }

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

        if(question.rightAnswerId === answerId){
            if(!results[question.id]) {
                results[question.id] = 'success';
            }
            this.setState({
                answerState: {[answerId]: 'success'},
                results
            });

            const timeout = window.setTimeout( () => {
                if(this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    });
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    });
                }

                window.clearTimeout(timeout);
            }, 1000);

        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            });
        }
    }

    onRetryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        });
    }
    

    render(){
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.state.isFinished
                        ? <FinishedQuiz 
                                results = {this.state.results}
                                quiz = {this.state.quiz}
                                onRetry = {this.onRetryHandler}
                            />
                        : <ActiveQuiz
                            question = {this.state.quiz[this.state.activeQuestion].question}
                            answers = {this.state.quiz[this.state.activeQuestion].answers}
                            answerNumber = {this.state.activeQuestion + 1}
                            quizLength = {this.state.quiz.length}
                            onAnswerClick = {this.onAnswerClickHandler}
                            state = {this.state.answerState}
                        />
                    }
                    
                </div>
            </div>
        )
    }
}