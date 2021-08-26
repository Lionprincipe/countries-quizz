import { useEffect, useState } from 'react'
import axios from 'axios'
import { callFnNtime, getNRandomItemsFromList, getRndInteger } from '../utils'

export type Question = {
  question: string
  answers: string[]
  validAnswer?: string
  urlFlag?: string
}

interface APIDataType {
  capital: string
  flag: string
  name: string
  language: { name: string }[]
}

export const useCountryQuizzHook = () => {
  const NB_QUESTIONS = 10
  const NB_ANSWERS = 4
  const url =
    'https://restcountries.eu/rest/v2/all?fields=name;capital;flag;languages'
  const [data, setData] = useState<APIDataType[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [exceptions, setExceptions] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const [roundIndex, setRoundIndex] = useState(0)
  const [gameOn, setGameOn] = useState(true)

  const initGame = (data: APIDataType[]) => {
    const questionCountries = callFnNtime(NB_QUESTIONS, () => {
      return getNRandomItemsFromList(data, NB_ANSWERS, exceptions)
    })
    const questions = composeCountriesQuestions(questionCountries)
    setQuestions(questions)
    setExceptions(questionCountries[questionCountries.length - 1].exceptions)
  }

  useEffect(() => {
    axios
      .get(url)
      .then((response: { data: APIDataType[] }) => {
        setData(response.data)
        initGame(response.data)
      })
      .catch((err) => console.log(err))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    initGame(data)
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

const composeCountriesQuestions = (
  questionCountries: {
    selected: APIDataType[]
    exceptions: number[]
  }[]
) => {
  return questionCountries.map(({ selected }) => {
    const answerIndex = getRndInteger(0, selected.length - 1)
    const answers = selected.map(({ name }) => name)
    const { name, capital, flag } = selected[answerIndex]

    const type = getRndInteger(1, 2)

    switch (type) {
      default:
      case 1: {
        return {
          question: `${capital} is the capital of`,
          answers,
          validAnswer: name,
        }
      }
      case 2: {
        return {
          question: `Which country does this flag belong to?`,
          urlFlag: flag,
          answers,
          validAnswer: name,
        }
      }
    }
  })
}
