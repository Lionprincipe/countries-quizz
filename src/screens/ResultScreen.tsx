import React from 'react'
import { ReactComponent as ResultIllustration } from '../assets/result_illustration.svg'

const ResultScreen = () => {
  return (
    <div className='result-card'>
      <ResultIllustration />
      <h2>Results</h2>
      <p className='result-info'>you got 4 correct answers</p>
      <button>Try again</button>
    </div>
  )
}

export default ResultScreen
