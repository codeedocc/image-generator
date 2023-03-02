import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { logo } from './assets'
import CreatePost from './pages/CreatePost'

const App = () => {
  return (
    <>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <img src={logo} alt="logo" className="w-28 object-contain" />
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <CreatePost />
      </main>
    </>
  )
}

export default App
