import React from 'react'
import './Layout.style.css'
type LayoutProps = {
  disableIllustration?: boolean
}

const Layout: React.FC<LayoutProps> = ({
  children,
  disableIllustration = false,
}) => {
  return (
    <>
      <main className='container'>
        <header>
          <h1 className='heading'>Country Quiz</h1>
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
