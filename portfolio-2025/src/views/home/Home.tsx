import { useEffect, useRef } from 'react'
import { animate } from 'animejs'

import meAvatar from '../../assets/meNeonBg.png'

const animatedText = "Hi! My name is Steve you can call me HITORU."

const Home = () => {
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (textRef.current) {
      animate(
        textRef.current.querySelectorAll('span'),
        {
          y: [
            { to: '-2.75rem', ease: 'outExpo', duration: 600 },
            { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
          ],
          rotate: {
            from: '-1turn',
            delay: 0
          },
          delay: (_: any, i: number) => i * 50,
          ease: 'inOutCirc',
          loopDelay: 1000,
          loop: true
        }
      )
    }
  }, [])

  return (
    <div id="home" className="h-screen w-full flex flex-row justify-center items-center bg-black p-10">
      <div className='w-[25%] h-fit flex justify-center'>
        <img src={meAvatar} className='w-[20rem] h-[30rem] rounded-xl'/>
      </div>
      <div className='text-white p-5 w-[70%] flex justify-center items-start flex-col'>
        <h2 ref={textRef} className="flex flex-wrap text-[3.5rem] w-[70%]">
          {animatedText.split('').map((char, idx) => (
            <span key={idx} style={{ display: 'inline-block' }}>{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </h2>
        <div className='text-2xl gradient-animated-text'>
          I am a Software Developer and I love to create things that makes life enjoyable.
        </div>
      </div>
    </div>
  )
}

export default Home