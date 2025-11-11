import { Suspense, useMemo, useCallback, useRef } from 'react'
import ProjectCard from './Components/ProjectCard.jsx'

//Wave design imports
import * as THREE from 'three'
import {Canvas, useLoader, useFrame} from '@react-three/fiber'
import circle from './assets/circle.png'

//Skills imports
import muralPhoto from './assets/CobinMural.jpg'
import SkillCard from './Components/SkillCard.jsx'
import ReactLogo from'./assets/react.svg'
import JavaIcon from'./assets/java-icon.svg'
import CSIcon from'./assets/Logo_C_sharp.svg'
import CSSIcon from'./assets/css.svg'
import NodeIcon from'./assets/nodejs.svg'
import QdrantIcon from'./assets/qdrant.svg'
import JSIcon from'./assets/js.svg'
import UnityIcon from'./assets/unity.svg'
import CPPIcon from'./assets/cpp.svg'
import HTMLIcon from'./assets/html.svg'
import TailwindIcon from'./assets/tailwind.svg'
import GitIcon from'./assets/git.svg'
import PythonIcon from './assets/python.svg'

//Project imports
import SeeGapImg from './assets/ProjectMedia/SeeGapShot.png'
import SongSeekImg from './assets/ProjectMedia/songSeekShot.png'
import SunsetImg from './assets/ProjectMedia/sunsetShot.png'
import SandboxImg from './assets/ProjectMedia/sandboxShot.png'
import ApplicationImg from './assets/ProjectMedia/ApplicationShot.png'
import TrafficImg from './assets/ProjectMedia/TrafficShot.png'
import PendulumImg from './assets/ProjectMedia/PendulumShot.png'
import WordleImg from './assets/ProjectMedia/wordleShot.png'
import StippleImg from './assets/ProjectMedia/stippleShot.png'
import SortImg from './assets/ProjectMedia/sortShot.png'
import PerspectiveImg from './assets/ProjectMedia/perspectiveShot.png'

import PendulumVid from './assets/ProjectMedia/pendulumVid.mp4'
import SandboxVid from './assets/ProjectMedia/sandboxVid.mp4'
import WordleVid from './assets/ProjectMedia/wordleVid.mp4'
import StippleVid from './assets/ProjectMedia/stippleVid.mp4'
import SortVid from './assets/ProjectMedia/sortVid.mp4'
import PerspectiveVid from './assets/ProjectMedia/perspectiveVid.mp4'
import TrafficVid from './assets/ProjectMedia/trafficVid.mp4'
import SeeGapVid from './assets/ProjectMedia/SeeGapVid.mp4'

import emailjs from 'emailjs-com'

const ServiceID = 'service_portfolio'
const TemplateID = 'template_ew1utvj'
const PublicKey = 'Oj_-O_4l-1VLlKaCY'

function Points(){
  const circleTex = useLoader(THREE.TextureLoader, circle)
  const bufferRef = useRef()

  const count = 100
  const sep = 3

  const tRef = useRef(0)
  const f = 0.0005
  const a = 3

  const graph = useCallback((x, z) => {
    return Math.sin(f * (x**2 + (Math.cos(z)*x)**2 + tRef.current)) * a
  })

  let positions = useMemo(() => {
    let positions = []

    for(let xi=0; xi < count; xi++){
      for(let zi=0; zi < count; zi++){
        let x = sep * (xi - count / 2)
        let z = sep * (zi - count / 2)
        let y = graph(x, z)

        positions.push(x, y, z)
      }
    }

    return new Float32Array(positions);
  }, [count, sep, graph])

  useFrame(() => {
    tRef.current += 15
    const positions = bufferRef.current.array

    let i = 0
    for(let xi=0; xi < count; xi++){
      for(let zi=0; zi < count; zi++){
        let x = sep * (xi - count / 2)
        let z = sep * (zi - count / 2)
        let y = graph(x, z)

        positions[i + 1] = y
        i += 3
      }
    }

    bufferRef.current.needsUpdate = true;
  })

  return(
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute 
        ref={bufferRef}
        attach='attributes-position' 
        array={positions}
        itemSize={3}
        count={positions.length / 3}/>
      </bufferGeometry>

      <pointsMaterial 
        attach="material" 
        map={circleTex}
        color={0x00AAFF}
        size={0.5}
        sizeAttenuation
        transparent
        alphaTest={0.5}
        opacity={0.75}></pointsMaterial>
    </points>
  )
}

function AnimationCanvas(){
  return(
    <Canvas
      gl={{outputColorSpace: THREE.SRGBColorSpace}}
      camera={{position: [100, 20, 0], fov: 60}}>

      <Suspense fallback={null}>
        <Points/>
      </Suspense>
    </Canvas>
  )
}

const handleSubmit = (e) => {
  e.preventDefault()
  emailjs.sendForm(ServiceID, TemplateID, e.target, PublicKey)
    .then((result) => {
      console.log(result.text)
      alert('Message Sent')
    }, (error) => {
      console.log(error.text)
      alert('Problem sending message')
    })
  e.target.reset()
}

function App() {

  return (
    <>
      <section id='home'>
        <div className='homeSection'>
          <Suspense fallback={<div></div>}>
            <AnimationCanvas/>
          </Suspense>
          <div className='homeContent'>
            <p className='hello'>Hello, I'm Cobin</p>
            <a className='homeButton' href='#about'>Check it Out</a>
          </div>
        </div>
      </section>

      <nav className='navBar'>
        <ul className='nav'>
          <a id='hom' href='#home' className='navButton'>Home</a>
          <a id='abt' href='#about' className='navButton'>About</a>
          <a id='projs' href='#projects' className='navButton'>Projects</a>
          <a id='cont' href='#contact' className='navButton'>Contact</a>
        </ul>
      </nav>

      <section id='about' className='about'>
        <h1 className='sectionHeader'> About </h1>
        <div className='aboutSection'>
          <div className='aboutImgContainer'>
            <img src={muralPhoto} className='muralImg'></img>
          </div>
          
            <p style={{fontSize:'1.5rem'}} className='aboutParagraph'>
            Passionate and hard working Computer Science student beginning my second year at the University of Iowa.
            I love creating full-stack web apps, participating in game jams and hackathons, and 
            tinkering with virtual simulations. I am always searching for new challenges and ways to expand 
            my knowledge. When I'm not programming, I like playing the drums, performing gigs with my band, 
            and drinking coffee.
            </p>
        </div>

        <div className='skillsFlex'>
          <div>
            <SkillCard label="REACT" img={ReactLogo}/>
            <SkillCard label="Node.js" img={NodeIcon}/>
            <SkillCard label="HTML" img={HTMLIcon}/>
            <SkillCard label="Tailwind" img={TailwindIcon}/>
          </div>
          <div>
            <SkillCard label="Java" img={JavaIcon}/>
            <SkillCard label="CSS" img={CSSIcon}/>
            <SkillCard label="JavaScript" img={JSIcon}/>
            <SkillCard label="C++" img={CPPIcon}/>
            <SkillCard label="Python" img={PythonIcon}/>
          </div>
          <div>
            <SkillCard label="C#" img={CSIcon}/>
            <SkillCard label="QDrant" img={QdrantIcon}/>
            <SkillCard label="Unity" img={UnityIcon}/>
            <SkillCard label="Git" img={GitIcon}/>
          </div>
        </div>

      </section>

      <section id='projects' className='projects'>
        <h1 className='sectionHeader'> Projects </h1>
        <div className='projectsContainer'>
          <ProjectCard vid={SeeGapVid} img={SeeGapImg} url='https://github.com/Cobin1205/see-the-gap'/>
          <ProjectCard img={SongSeekImg} url=''/>
          <ProjectCard img={SunsetImg} url=''/>
          <ProjectCard vid={PendulumVid} img={PendulumImg} url='https://github.com/Cobin1205/MusicalPendulum'/>
          <ProjectCard img={ApplicationImg} url=''/>
          <ProjectCard vid={SandboxVid} img={SandboxImg} url='https://github.com/Cobin1205/SandSimulation'/>
          <ProjectCard vid={WordleVid} img={WordleImg} url='https://github.com/Cobin1205/WordleClone'/>
          <ProjectCard vid={StippleVid} img={StippleImg} url='https://github.com/Cobin1205/Stipple'/>
          <ProjectCard vid={TrafficVid} img={TrafficImg} url='https://github.com/Cobin1205/TrafficLight'/>
          <ProjectCard vid={SortVid} img={SortImg} url='https://github.com/Cobin1205/SortVisualizer'/>
          <ProjectCard vid={PerspectiveVid} img={PerspectiveImg} url='https://github.com/Cobin1205/WeakPerspectiveProjection'/>
        </div>
      </section>

      <section id='contact' className='contact'>
        <h1 className='sectionHeader'>Contact</h1>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Name' id='from_name' name='from_name' className='nameEmail'></input>
          <input type='text' placeholder='Email' id='from_email' name='from_email' className='nameEmail'></input>
          <textarea placeholder='Message' name='message' className='contactMessage'></textarea>
          <input type='submit' className='contactSubmit'></input>
        </form>
      </section>

      <footer>
        
      </footer>
    </>
  )
}

export default App
