
import me from '../../assets/me.jpeg'

const AboutMe = () => { 
  return (
    <div className="h-full w-full flex flex-col justify-center gap-5 items-center">
      <div className='h-[200px] w-[200px] rounded-full overflow-hidden'>
        <img src={me} className='h-full w-full object-cover'/>
      </div>
      <div className="max-w-2xl w-full text-center text-white">
        <h1 className="text-3xl font-bold mb-6">About Me</h1>
        <p className="text-xl leading-relaxed ">
          I’m Steve Suico, a dynamic software developer with a strong foundation in full-stack development and a passion for crafting efficient, user-friendly web applications.
          With professional experience at Channel Precision Inc., I’ve contributed to automating workflows and building internal tools that streamline operations across departments.
          I specialize in frontend technologies like ReactJS and design prototyping with Figma, and I’m equally comfortable working on backend systems using NodeJS and MongoDB.
          My ability to bridge technical execution with user experience, combined with strong collaboration and problem-solving skills, allows me to deliver impactful software solutions
          that meet real business needs.
        </p>
      </div>
    </div>
  )
}

export default AboutMe