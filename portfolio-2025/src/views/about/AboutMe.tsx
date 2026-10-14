import { FaGamepad, FaHeadphones, FaFilm } from 'react-icons/fa'
import me from '../../assets/me.webp'

const interests = [
  { name: 'Gaming', icon: FaGamepad },
  { name: 'Music', icon: FaHeadphones },
  { name: 'Movies', icon: FaFilm },
]

const AboutMe = () => {
  return (
    <div className="flex w-full flex-col items-center gap-6 py-4">
      <div className="h-[180px] w-[180px] overflow-hidden rounded-full ring-4 ring-pink-500/30">
        <img src={me} alt="Steve Suico" width={180} height={180} className="h-full w-full object-cover" />
      </div>
      <div className="w-full max-w-2xl text-center text-white">
        <h2 className="mb-4 text-3xl font-bold">About Me</h2>
        <p className="text-base leading-relaxed text-gray-300 md:text-lg">
          I build and ship full-stack web applications, from the interface through deployment.
          Most of my work is user-facing React, backed by APIs, data pipelines, and cloud infrastructure
          on Google Cloud. I take a feature from a rough requirement to something a client can use,
          including the release and the monitoring that follows it. I like modern tooling, including
          AI-assisted workflows, when it makes the product more reliable rather than just faster to demo.
        </p>
      </div>
      <div className="w-full max-w-2xl">
        <h3 className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-gray-400">
          Outside of work
        </h3>
        <ul className="flex flex-wrap justify-center gap-3">
          {interests.map((interest) => (
            <li
              key={interest.name}
              className="inline-flex items-center gap-2 rounded-full border border-gray-700/60 bg-gray-800/70 px-4 py-2 text-sm text-gray-200"
            >
              <interest.icon className="text-pink-400" aria-hidden="true" />
              {interest.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AboutMe
