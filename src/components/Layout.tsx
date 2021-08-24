import React from 'react'
import { ReactComponent as QuizzIllustration } from '../assets/quizz_illustration.svg'
const Layout: React.FC = ({ children }) => {
  return (
    <>
      <main className='container'>
        <header>
          <h1 className='heading'>Country Quiz</h1>
          <QuizzIllustration className='quizz-illustration' />
        </header>
        {children}
      </main>
      <footer>
        created by <strong>@lionprincipe </strong> - devChallenges.io
      </footer>
    </>
  )
}

export default Layout
