import { useState } from 'react'
import './App.css'

interface CatVideo {
  id: number
  title: string
  thumbnail: string
  duration: string
  views: string
  aiModel: string
}

function App() {
  const [loading, setLoading] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<CatVideo | null>(null)

  // Simulated AI-generated cat videos
  const catVideos: CatVideo[] = [
    {
      id: 1,
      title: 'Fluffy Cat Playing with Yarn',
      thumbnail: 'https://placecats.com/400/300?1',
      duration: '0:45',
      views: '12.3K',
      aiModel: 'CatGPT-4'
    },
    {
      id: 2,
      title: 'Curious Kitten Exploring Garden',
      thumbnail: 'https://placecats.com/400/300?2',
      duration: '1:12',
      views: '8.7K',
      aiModel: 'FelineAI-Pro'
    },
    {
      id: 3,
      title: 'Cat Doing Backflip in Slow Motion',
      thumbnail: 'https://placecats.com/400/300?3',
      duration: '0:32',
      views: '24.1K',
      aiModel: 'PurrVision-5'
    },
    {
      id: 4,
      title: 'Sleepy Cat Dreaming of Fish',
      thumbnail: 'https://placecats.com/400/300?4',
      duration: '2:05',
      views: '15.9K',
      aiModel: 'CatGPT-4'
    },
    {
      id: 5,
      title: 'Tabby Cat Chasing Laser Pointer',
      thumbnail: 'https://placecats.com/400/300?5',
      duration: '1:28',
      views: '19.2K',
      aiModel: 'FelineAI-Pro'
    },
    {
      id: 6,
      title: 'Cat Jumping Through Hoops',
      thumbnail: 'https://placecats.com/400/300?6',
      duration: '0:58',
      views: '31.5K',
      aiModel: 'PurrVision-5'
    }
  ]

  const handleGenerateVideo = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert('New AI cat video generated! (Demo mode)')
    }, 2000)
  }

  const handleVideoClick = (video: CatVideo) => {
    setSelectedVideo(video)
  }

  const closeModal = () => {
    setSelectedVideo(null)
  }

  return (
    <div className="app">
      {import.meta.env.VITE_SUBSCRIBE_DEV_PROJECT_TOKEN && (
        <div className="env-token-banner">
          {import.meta.env.VITE_SUBSCRIBE_DEV_PROJECT_TOKEN}
        </div>
      )}
      <header className="header">
        <div className="header-content">
          <h1 className="title">
            <span className="icon">🐱</span>
            AI Cat Videos
          </h1>
          <p className="subtitle">Watch adorable AI-generated cat videos</p>
        </div>
        <button
          className="generate-btn"
          onClick={handleGenerateVideo}
          disabled={loading}
          aria-label="Generate new AI cat video"
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Generating...
            </>
          ) : (
            <>✨ Generate New Video</>
          )}
        </button>
      </header>

      <main className="main">
        <div className="video-grid">
          {catVideos.map((video) => (
            <article
              key={video.id}
              className="video-card"
              onClick={() => handleVideoClick(video)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleVideoClick(video)}
              aria-label={`Play ${video.title}`}
            >
              <div className="thumbnail-wrapper">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="thumbnail"
                  loading="lazy"
                />
                <div className="play-overlay">
                  <span className="play-icon">▶</span>
                </div>
                <span className="duration">{video.duration}</span>
              </div>
              <div className="video-info">
                <h2 className="video-title">{video.title}</h2>
                <div className="video-meta">
                  <span className="views">{video.views} views</span>
                  <span className="ai-badge">{video.aiModel}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {selectedVideo && (
        <div
          className="modal-overlay"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={closeModal}
              aria-label="Close video player"
            >
              ×
            </button>
            <h2 id="modal-title" className="modal-title">{selectedVideo.title}</h2>
            <div className="video-player">
              <img
                src={selectedVideo.thumbnail}
                alt={selectedVideo.title}
                className="modal-thumbnail"
              />
              <p className="demo-notice">
                Video player demo - AI generation in progress
              </p>
            </div>
            <div className="modal-info">
              <div className="modal-meta">
                <span>👁 {selectedVideo.views} views</span>
                <span>⏱ {selectedVideo.duration}</span>
                <span>🤖 {selectedVideo.aiModel}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>Powered by AI • All cat videos are synthetically generated</p>
      </footer>
    </div>
  )
}

export default App
