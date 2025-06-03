import { useEffect, useRef } from 'react'
import { animate } from 'animejs'
import gamingbg from '../../assets/gamingbg.gif'

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
    <div
      className="h-screen w-full flex justify-center items-center"
      style={{
        backgroundImage: `url(${gamingbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='text-white bg-black p-5'>
        <h2 ref={textRef} className="flex flex-wrap text-[2rem]">
          {animatedText.split('').map((char, idx) => (
            <span key={idx} style={{ display: 'inline-block' }}>{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </h2>
        <div className='text-2xl'>
          I am a software engineer and I love to create things with code.
        </div>
      </div>
    </div>
  )
}

export default Home