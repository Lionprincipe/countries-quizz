import React, { useState } from 'react'
import AnswerItem from '../components/AnswerItem'
import { ReactComponent as QuizzIllustration } from '../assets/quizz_illustration.svg'

type QuestionsScreenProps = {
  question: string
  answers: string[]
  validAnswer?: string
  checkValidAnswer: (answer: string, selected: string) => boolean
}

const QuestionScreen: React.FC<QuestionsScreenProps> = ({
  question,
  answers,
  validAnswer,
  checkValidAnswer,
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

      <h2>{question}</h2>
      {answers.length > 0 && (
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
      <button className='next-button'>next</button>
    </div>
  )
}

export default QuestionScreen
