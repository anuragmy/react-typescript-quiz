import { Shuffle } from './utils'

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export type Answer = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

export type Question = {
  category:string;
  correct_answer:string;
  difficulty:string;
  incorrect_answers:string[];
  question:string;
  type: string;
}

export type QuestionState = Question & {answers: string[]}

export const fetchQuestions = async (amount: number, difficulty: Difficulty) => {
  const url = `https://opentdb.com/api.php?amount=${amount}&category=9&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(url)).json();
  return data.results.map((question: Question, i:number) => ({
    ...question,
    key: i,
    answers: Shuffle([...question.incorrect_answers, question.correct_answer]),
  }))
}