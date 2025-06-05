import react from '../../assets/react.svg'
import tailwind from '../../assets/tailwind.png'
import typescript from '../../assets/Typescript.png'
import javascript from '../../assets/Javascript.png'
import appsscript from '../../assets/appsscript.png'
import figma from '../../assets/figma.png'
import github from '../../assets/github.png'
import node from '../../assets/nodeJs.png'
import mongo from '../../assets/mongodb.png'
import zustand from '../../assets/zustand.png'
import postman from '../../assets/postman.png'

const skills = [
  { name: 'React', image: react },
  { name: 'Tailwind', image: tailwind },
  { name: 'TypeScript', image: typescript },
  { name: 'JavaScript', image: javascript },
  { name: 'Apps Script', image: appsscript },
  { name: 'Figma', image: figma },
  { name: 'Postman', image: postman },
  { name: 'Node.js', image: node },
  { name: 'MongoDB', image: mongo },
    { name: 'Zustand', image: zustand },
]

const Skills = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center gap-5 items-center">
      <div className="grid grid-cols-5 gap-4">
        {skills.map((skill, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div className="h-[200px] w-[200px] rounded-full overflow-hidden">
              <img src={skill.image} alt={skill.name} className="h-full w-full object-cover" />
            </div>
            <p className="text-white text-lg font-medium">{skill.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skills
