import About from '@/views/about/About'
import Contact from '@/views/contact/Contact'
import Contributions from '@/views/contributions/Contributions'
import Education from '@/views/education/Education'
import Experience from '@/views/experience/Experience'
import Home from '@/views/home/Home'
import Projects from '@/views/projects/Projects'
import Services from '@/views/services/Services'

const Layout = () => {
  return (
    <div className="w-full flex flex-col bg-black">
      <Home />
      <About />
      <Services />
      <Experience />
      <Education />
      <Projects />
      <Contributions />
      <Contact />
    </div>
  )
}

export default Layout
