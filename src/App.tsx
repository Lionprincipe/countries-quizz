import React from 'react'

import './App.css'
import Layout from './components/Layout'
import QuestionScreen from './screens/QuestionScreen'

function App() {
  return (
    <div className='App'>
      <Layout>
        <QuestionScreen />
      </Layout>
    </div>
  )
}

export default App
