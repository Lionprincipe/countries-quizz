import { useEffect, useState } from 'react'

import {
  callFnNtime,
  getNRandomItemsFromListWithExceptions,
  getRndInteger,
} from '../utils'

import { fetchCoutriesData } from '../API'

import { IData, IQuestion, QuestionType } from '../types'

const NB_QUESTIONS = 10
const NB_ANSWERS = 4
const QUESTION_TYPES = [QuestionType.CAPITAL, QuestionType.FLAG]

export const useCountryQuizzHook = () => {
  const [data, setData] = useState<IData[]>([])
  const [questions, setQuestions] = useState<IQuestion[]>([])
  const [exceptions, setExceptions] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const [roundIndex, setRoundIndex] = useState(0)
  const [gameOn, setGameOn] = useState(true)

  const initGame = (data: IData[]) => {
    const questionCountries = callFnNtime(NB_QUESTIONS, () => {
      return getNRandomItemsFromListWithExceptions(data, NB_ANSWERS, exceptions)
    })
    const questions = composeCountriesQuestions(questionCountries)
    setQuestions(questions)
    setExceptions(questionCountries[questionCountries.length - 1].exceptions)
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const pasedData = await fetchCoutriesData()
        setData(pasedData)
        initGame(pasedData)
      } catch (err) {
        console.log('coould not receive data from the server', err)
      }
    }
    getData()

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
    roundCount: roundIndex > 0 ? roundIndex + 1 : 0,
    score,
    gameOn,
    roundIndex,
    resetGame,
  }
}

const composeCountriesQuestions = (
  questionCountries: {
    selected: IData[]
    exceptions: number[]
  }[]
) => {
  return questionCountries.map(({ selected }) => {
    const answerIndex = getRndInteger(0, selected.length - 1)
    const answers = selected.map(({ name }) => name)
    const { name, capital, flag } = selected[answerIndex]

    const type = getNRandomItemsFromListWithExceptions(QUESTION_TYPES, 1, [])
      .selected[0]

    switch (type) {
      default:
      case QuestionType.CAPITAL: {
        return {
          question: `${capital} is the capital of`,
          answers,
          validAnswer: name,
        }
      }
      case QuestionType.FLAG: {
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
