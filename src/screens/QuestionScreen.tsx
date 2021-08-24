import React from 'react'

const QuestionScreen = () => {
  return (
    <div className='quizz-card'>
      <h2>Kuala Lumpur is the capital of</h2>
      <ul>
        <li className='quizz-answerd-item selected'>
          <span>Vietnam</span>
        </li>
        <li className='quizz-answerd-item'>
          <span>Malaysia</span>
        </li>
        <li className='quizz-answerd-item'>
          <span>Sweden</span>
        </li>
        <li className='quizz-answerd-item'>
          <span>Austria</span>
        </li>
      </ul>
    </div>
  )
}

export default QuestionScreen
