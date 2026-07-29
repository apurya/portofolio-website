import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import About from './Components/About'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import Experience from './Components/Experience'
import ExperienceDivider from './Components/ExperienceDivider'
import Works from './Components/Works'
import Contact from './Components/Contact'
import Footer from './Components/Footer'
import NotFound from './Components/NotFound'
import CustomCursor from './Components/CustomCursor'

function MainPage() {
  return (
    <>
      <Navbar />
      <Home />
      <About />
      <ExperienceDivider />
      <Experience />
      <Works />
      <Contact />
      <Footer />
    </>
  )
}

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-cream dark:bg-slate-900 transition-colors duration-300">
      <div className="relative z-10">
        <CustomCursor />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App