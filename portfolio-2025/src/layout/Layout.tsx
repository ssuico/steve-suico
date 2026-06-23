import Home from '@/views/home/Home'
import Navbar from './Navbar'
import Footer from './Footer'
import About from '@/views/about/About'
import Experience from '@/views/experience/Experience'
import Education from '@/views/education/Education'
import Projects from '@/views/projects/Projects'
import Contact from '@/views/contact/Contact'
import ScrollToTop from '@/components/ui/ScrollToTop'

const Layout = () => {
  return (
    <div className='w-full min-h-[2000px] max-h-fit flex flex-col bg-black'>
      <Navbar/>
      <Home/>
      <About/>
      <Experience/>
      <Education/>
      <Projects/>
      <Contact/>
      <Footer/>
      <ScrollToTop/>
    </div>
  )
}

export default Layout