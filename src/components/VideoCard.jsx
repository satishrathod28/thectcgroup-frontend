import React, { useState } from 'react'

const VideoCard = ({data}) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  return (
    <div className='video-card'>
        <div className='video-card-img'>
           {/* !isPlaying ? (
                <div className="video-thumbnail" >
                    <button className="play-button" onClick={handlePlay}>
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" fill="currentColor"/>
                        </svg>
                    </button>
                    
                </div>
            ) :  */}
            
            {
             
            data?.image	 ? (
                <video
                    src={data?.image	}
                    controls
                    
                    className="w-100 h-auto"
                >
                    Your browser does not support the video tag.
                </video>
            ) : ''
            }
        </div>
        <div className='video-card-content'>
            <h3 className='video-card-title'>{data?.title}</h3>
            <p className='para' dangerouslySetInnerHTML={{ __html: data?.description }}></p>
        </div>
    </div>
  )
}

export default VideoCard