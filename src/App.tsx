import React from 'react'

import './App.css'
import Layout from './components/Layout'
import QuestionScreen from './screens/QuestionScreen'
import ResultScreen from './screens/ResultScreen'

function App() {
  const question = 'Kuala Lumpur is the capital of'
  const answers = ['Vietnam', 'Malaysia', 'Sweden', 'Austria']
  const validAnswer = 'Malaysia'
  const checkValidAnswer = (answer: string, selected: string) => {
    return answer === selected
  }
  const isPlayOn = false
  return (
    <div className='App'>
      <Layout>
        {isPlayOn ? (
          <QuestionScreen
            question={question}
            answers={answers}
            checkValidAnswer={checkValidAnswer}
            validAnswer={validAnswer}
          />
        ) : (
          <ResultScreen />
        )}
      </Layout>
    </div>
  )
}

export default App
