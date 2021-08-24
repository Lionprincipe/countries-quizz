import './App.css'
import Layout from './components/Layout'
import { useCountryQuizzHook } from './hooks/useCountryQuizzhook'
import QuestionScreen from './screens/QuestionScreen'
import ResultScreen from './screens/ResultScreen'

function App() {
  const {
    score,
    currentQuestion,
    totalQuestions,
    roundCount,
    handleStartNextRound,
    gameOn,
    resetGame,
  } = useCountryQuizzHook()
  return (
    <div className='App'>
      <Layout>
        {gameOn ? (
          <>
            <QuestionScreen
              {...currentQuestion}
              roundCount={roundCount}
              totalQuestion={totalQuestions}
              onNext={handleStartNextRound}
            />
          </>
        ) : (
          <ResultScreen score={score} onTryAgain={() => resetGame()} />
        )}
      </Layout>
    </div>
  )
}

export default App
