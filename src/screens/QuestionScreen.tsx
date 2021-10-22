import React, { useState } from 'react'
import AnswerItem from '../components/AnswerItem'
import { ReactComponent as QuizzIllustration } from '../assets/quizz_illustration.svg'

import './QuestionScreen.style.css'

type QuestionsScreenProps = {
  roundCount: number
  totalQuestion: number
  question: string
  answers: string[]
  urlFlag?: string
  validAnswer?: string
  onNext: (hasSucceeded: boolean) => void
}

const QuestionScreen: React.FC<QuestionsScreenProps> = ({
  question,
  answers,
  validAnswer,
  totalQuestion,
  roundCount,
  urlFlag,
  onNext,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<null | string>(null)

  const handleClick = (answer: string) => {
    if (!selectedAnswer) {
      setSelectedAnswer(answer)
    }
  }

  return (
    <div
      className={`quizz-card ${
        !!selectedAnswer ? 'is-showing-result' : 'is-showing-question'
      }`}
    >
      <QuizzIllustration className='quizz-illustration' />
      <h3 className='question-label'>
        {` Question ${roundCount} / ${totalQuestion}`}
      </h3>
      {urlFlag && (
        <img srcSet={urlFlag} className='flag-image' alt={question} />
      )}
      <h2>{question}</h2>
      {answers && answers.length > 0 && (
        <ul>
          {answers.map((answer) => (
            <AnswerItem
              disabled={!!selectedAnswer}
              key={answer}
              isValid={!!selectedAnswer && answer === validAnswer}
              isSelected={answer === selectedAnswer}
              value={answer}
              onClick={() => handleClick(answer)}
            />
          ))}
        </ul>
      )}
      <button
        className='next-button'
        onClick={() => {
          setSelectedAnswer(null)
          onNext(selectedAnswer === validAnswer)
        }}
      >
        next
      </button>
    </div>
  )
}

export default QuestionScreen
