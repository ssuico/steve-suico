
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaCode } from "react-icons/fa";

import hitoru from '../assets/hitoruLogo1.png'

const Navbar = () => {
  return (
    <div className='w-[80%] h-[5rem] bg-black flex flex-row justify-around items-center text-white fixed top-10 left-1/2 -translate-x-1/2 z-50 rounded-lg opacity-80'>  
    <div className="w-[10rem] h-[4rem] overflow-hidden rounded-lg flex flex-row items-center justify-center ">
      <p className="text-2xl font-bold">HITORU</p>
      <FaCode className="text-2xl font-bold"/>
    </div>
      <div className='flex flex-row gap-8 text-xl'>
        <a href="#home" className='font-semibold'>Home</a>
        <a href="#about" className='font-semibold'>About</a>
        <a href="#projects" className='font-semibold'>Projects</a>
        <a href="#contact" className='font-semibold'>Contact</a>
      </div>
      <div className='flex flex-row gap-4'>
        <FaFacebook className="h-5 w-5 cursor-pointer"/>
        <FaSquareXTwitter className="h-5 w-5 cursor-pointer"/>
        <FaInstagram className="h-5 w-5 cursor-pointer"/>
        <FaGithub className="h-5 w-5 cursor-pointer"/>
      </div>
    </div>
  )
}

export default Navbar