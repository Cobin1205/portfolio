import { useState } from 'react'

function ProjectCard({ img, vid, url}) {
  const [hovered, setHovered] = useState(false)

  return (
    <a href={url}
      target='new'
      className='projectCard'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {img && vid && (
        hovered ? (
          <video
            className='projectVideo'
            src={vid}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img className='projectImg' src={img}></img>
        )
      )}

      {!vid && img && (
        <img className='projectImg' src={img}></img>
      )}
    </a>
  )
}

export default ProjectCard
