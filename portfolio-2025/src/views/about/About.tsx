
import gamingbg from '../../assets/gamingbg.gif'
import AboutMe from "./AboutMe"

const About = () => {
  return (
    <div id="about" className="h-screen w-full flex flex-row gap-2 justify-center items-center"
      style={{
        backgroundImage: `url(${gamingbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <div className="w-[40%] h-full text-white bg-black opacity-50 flex flex-col justify-center items-center gap-4 font-bold text-[2rem]">
        <p className="cursor-pointer hover:scale-150 transition">------ About Me</p>
        <p className="cursor-pointer hover:scale-150 transition">------ Gaming</p>
        <p className="cursor-pointer hover:scale-150 transition">------ Music</p>
        <p className="cursor-pointer hover:scale-150 transition">------ Movies</p>
      </div>
      <div  className="w-[60%] h-full">
        <AboutMe/>
        {/* <Gaming/> */}
      </div>
    </div>
  )
}

export default About