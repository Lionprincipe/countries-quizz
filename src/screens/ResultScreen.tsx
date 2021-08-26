import React from 'react'
import { ReactComponent as ResultIllustration } from '../assets/result_illustration.svg'

import './ResultScreen.style.css'

type ResultScreenProps = {
  score?: number
  onTryAgain: () => void
}
const ResultScreen: React.FC<ResultScreenProps> = ({
  score = 0,
  onTryAgain,
}) => {
  return (
    <div className='result-card'>
      <ResultIllustration />
      <h2>Results</h2>
      <p className='result-info'>
        you got <strong>{score}</strong> correct answers
      </p>
      <button onClick={() => onTryAgain()}>Try again</button>
    </div>
  )
}

export default ResultScreen
