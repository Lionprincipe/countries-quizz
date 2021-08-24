import { useState } from 'react'
export type Question = {
  question: string
  answers: string[]
  validAnswer?: string
  urlFlag?: string
}

const questions: Question[] = [
  {
    question: 'Kuala Lumpur is the capital of',
    answers: ['Vietnam', 'Malaysia', 'Sweden', 'Austria'],
    validAnswer: 'Malaysia',
  },
  {
    question: 'which country does this flag belong to?',
    urlFlag: '',
    answers: ['Vietnam', 'Finland', 'Sweden', 'Austria'],
    validAnswer: 'Finland',
  },
]
export const useCountryQuizzHook = () => {
  const [score, setScore] = useState(0)
  const [roundIndex, setRoundIndex] = useState(0)
  const [gameOn, setGameOn] = useState(true)

  const handleStartNextRound = (hasSucceeded: boolean) => {
    if (hasSucceeded) {
      setScore(score + 1)
    }
    if (roundIndex < questions.length - 1) {
      setRoundIndex(roundIndex + 1)
    } else {
      setGameOn(false)
    }
  }

  const resetGame = () => {
    setScore(0)
    setRoundIndex(0)
    setGameOn(true)
  }

  return {
    currentQuestion: questions[roundIndex],
    handleStartNextRound,
    totalQuestions: questions.length,
    roundCount: roundIndex + 1,
    score,
    gameOn,
    roundIndex,
    resetGame,
  }
}
