import gaming from '../../assets/gaming.avif'
import music from '../../assets/music.webp'
import movies from '../../assets/movies.jpg'

const hobbies = [
  { name: 'Gaming', image: gaming },
  { name: 'Music', image: music },
  { name: 'Movies', image: movies },
]

const Hobbies = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center gap-5 items-center">
      <div className="flex items-center justify-center flex-wrap gap-6 pt-[10rem]">
        {hobbies.map((hobby, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div className="h-[300px] w-[400px] rounded-xl overflow-hidden">
              <img src={hobby.image} alt={hobby.name} className="h-full w-full object-cover" />
            </div>
            <p className="text-white text-lg font-medium">{hobby.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hobbies
