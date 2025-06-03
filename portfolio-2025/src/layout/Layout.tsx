import Home from '@/views/home/Home'
import Navbar from './Navbar'
import About from '@/views/about/About'
import Projects from '@/views/projects/Projects'
import Contact from '@/views/contact/Contact'

const Layout = () => {
  return (
    <div className='w-full min-h-[2000px] max-h-fit flex flex-col bg-black'>
      <Navbar/>
      <Home/>
      <About/>
      <Projects/>
      <Contact/>
    </div>
  )
}

export default Layout