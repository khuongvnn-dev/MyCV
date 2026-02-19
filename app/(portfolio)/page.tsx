import Sidebar from '../components/Sidebar'
import About from '../components/About'
import Education from '../components/Education'
import Skills from '../components/Skills'
import Projects from '../components/Projects'

const PortfolioPage = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
     <Sidebar />

     <main className="flex-1 lg:ml-72 p-6 lg:p-12 space-y-20 mt-16 lg:mt-0">
        <About />
        <hr className="border-gray-200" />
        <Education />
        <hr className="border-gray-200" />
        <Skills />
        <hr className="border-gray-200" />
        <Projects />
      </main>
    </div>
  )
}

export default PortfolioPage