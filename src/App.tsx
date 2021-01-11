import React, { useState } from 'react';
import './App.css';
import QuestionCard from './QuestionCard';
import { Answer, fetchQuestions, Difficulty, QuestionState } from './api';
import { Wrapper } from './App.styles'


const TOTAL = 10;

const App = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const ans = e.currentTarget.value;
      // check for correct answer
      const correct = questions[number].correct_answer === ans;
      // add score if correct
      if (correct) setScore(prev => prev + 1);
      // save ans for user
      const ansObj = {
        question: questions[number].question,
        answer: ans,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers(prev => [...prev, ansObj]);

    }
  }
  const nextQuestion = () => {
    const next = number + 1;
    if (next === TOTAL) setGameOver(true);
    else setNumber(next);
  }
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuestions(TOTAL, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  return (
    <>
      <Wrapper>
        <h1>React Quiz</h1>
        {(userAnswers.length === TOTAL || gameOver) && (
          <button onClick={startTrivia} style={{marginTop: 10}}>Start</button>
        )}
        {!loading && !gameOver && (
          <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL}
          question={questions[number].question}
          answers={questions[number].answers}
          callback={checkAnswer}
          userAnswer={userAnswers ? userAnswers[number]: undefined}

        />
       )}
        {!gameOver && <p>Score: {score} </p>}
        {loading && <p>Loading Quesitons...</p>}
        {number !== TOTAL - 1  && !loading && !gameOver && userAnswers.length === number + 1 && (
        <button onClick={nextQuestion}>Next Question</button>
        )}
      </Wrapper>
    </>
  );
}

export default App;
