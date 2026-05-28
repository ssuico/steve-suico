
import me from '../../assets/me.jpeg'

const AboutMe = () => { 
  return (
    <div className="h-full w-full flex flex-col justify-center gap-5 items-center">
      <div className='h-[200px] w-[200px] rounded-full overflow-hidden ring-4 ring-pink-500/30'>
        <img src={me} className='h-full w-full object-cover'/>
      </div>
      <div className="max-w-2xl w-full text-center text-white">
        <h1 className="text-3xl font-bold mb-6">About Me</h1>
        <p className="text-xl leading-relaxed ">
          A results-driven software developer specializing in building and deploying full-stack web applications from concept to
          production. Experienced in developing user-centric frontend platforms and integrating them with scalable backend
          systems and cloud infrastructure. Proven ability to manage end-to-end delivery pipelines, including API integration,
          deployment, and monitoring. Adept at collaborating with cross-functional teams to translate complex technical and
          business requirements into reliable, client-ready solutions. Passionate about leveraging modern technologies and AI-driven 
          workflows to deliver impactful and scalable products.
        </p>
      </div>
    </div>
  )
}

export default AboutMe