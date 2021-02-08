import React from "react";
import { quizzes } from "./quizzes";

export class QuizGame extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            quizIndex: 0,
            correct: 0,
            minutes: 0,
            seconds: 30
        }
    };

        //timer
    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            }
        }, 1000)
    }

      //timer
      componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    onAnswerClick(e, i) {
        const chosenBtn = e.target.id;
        let currrentCorrect = this.state.correct;
        if (chosenBtn.toString() === i.toString()) {
            alert('Correct!');
            this.setState({ correct: currrentCorrect + 1 },
                console.log('incremented correct answered'))
            let newIndex = this.randomNewQuiz();
            this.setState({ quizIndex: newIndex });
        } else {
            alert('Wrong!, Try again!');
        }
    };

    displayQuiz(quiz) {
        const { minutes, seconds } = this.state
        return (
            <div>
                <h2 className="question-txt"> {quiz.question}</h2>
                <button className="answer-btn" onClick={e => this.onAnswerClick(e, quiz.indexOfRightAnswer)}
                    id={0} disabled={minutes === 0 && seconds === 0}>{quiz.answer_0}</button>
                <button className="answer-btn" onClick={e => this.onAnswerClick(e, quiz.indexOfRightAnswer)}
                    id={1} disabled={minutes === 0 && seconds === 0}>{quiz.answer_1}</button>
                <button className="answer-btn" onClick={e => this.onAnswerClick(e, quiz.indexOfRightAnswer)}
                    id={2} disabled={minutes === 0 && seconds === 0}>{quiz.answer_2}</button>
                <button className="answer-btn" onClick={e => this.onAnswerClick(e, quiz.indexOfRightAnswer)}
                    id={3} disabled={minutes === 0 && seconds === 0}>{quiz.answer_3}</button>
            </div>
        );
    }

    randomNewQuiz() {
        let currentQuizIndex = this.state.quizIndex;
        let index = Math.floor(Math.random() * quizzes.length);
        if (index === currentQuizIndex) {
            index = (index + 1) % quizzes.length;
        }

        currentQuizIndex = index;
        return index;
    }

    displayGameBoard() {
        let index = this.state.quizIndex;
        const quiz = quizzes[index];
        const { minutes, seconds } = this.state
        return (
            <div>
                <div className="gameBoard">
                    {this.displayQuiz(quiz)}
                </div>
                <div className="correct-answers-and-timer-div">
                    <h2 className="correct-answers">Correct: {this.state.correct}</h2>
                    {minutes === 0 && seconds === 0 ? 
                        <h1 className="gameover-txt">Game Over!</h1>
                        : 
                    <h1 className="timer-txt">Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                    }
                </div>
            </div>
        );
    }

    render() {

        return (    
            <div>
                <h1 className="quizgame_title">Anime Quiz</h1>
                {this.displayGameBoard()}
            </div>
            );
    }

}