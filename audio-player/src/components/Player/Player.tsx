import React, { useCallback, useEffect, useRef, useState } from 'react'
import HeartIcon from '../../assets/svg/heart-icon.svg?react'
import SpeakerIcon from '../../assets/svg/speaker-icon.svg?react'
import PlayIcon from '../../assets/svg/play-icon.svg?react'
import PauseIcon from '../../assets/svg/pause-icon.svg?react'
import ForwardIcon from '../../assets/svg/forward-icon.svg?react'
import BackIcon from '../../assets/svg/back-icon.svg?react'
import { formatTime } from '../../utils/formatTime'
import { Button } from '../../ui/Button/Button'
import type { IPlayerProps } from './types'

export const Player: React.FC<IPlayerProps> = ({
  track,
  isPlaying,
  setIsPlaying,
  onNext,
  onPrev,
  toggleFavorite,
  isFavorite,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)

 useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;
  if (!track) {
    audio.pause();
    audio.src = '';
    setIsPlaying(false);
    return;
  }
  
  audio.src = `data:audio/mp3;base64,${track.encoded_audio}`;
  audio.load();

  setCurrentTime(0);

}, [setIsPlaying, track]);

useEffect(() => {
  const audio = audioRef.current;
  if (!audio || !track) return;

  const playAudio = async () => {
    try {
      if (isPlaying) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch (e) {
      console.error('Ошибка при воспроизведении:', e);
    }
  };

  playAudio();
}, [isPlaying, track]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [setIsPlaying])

  const skipSeconds = (seconds: number) => {
    if (!audioRef.current) return
    audioRef.current.currentTime = Math.max(
      0,
      Math.min(
        audioRef.current.duration,
        audioRef.current.currentTime + seconds
      )
    )
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width
    audioRef.current.currentTime = percentage * audioRef.current.duration
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value)
    if (audioRef.current) audioRef.current.volume = vol
    setVolume(vol)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        skipSeconds(10)
      } else if (e.key === 'ArrowLeft') {
        skipSeconds(-10)
      } else if (e.key === ' ') {
        e.preventDefault()
        togglePlayPause()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPlaying, togglePlayPause, track])

  return (
    <footer className="footer">
      <div className="container">
        <div className="player">
          <div className="player__track">
            {track && (
              <>
                <img
                  className="player__img"
                  src="/track.jpg"
                  width={60}
                  height={60}
                />
                <div className="player__track-info">
                  <div className="player__track-wrap">
                    <span className="player__track-title">{track.title}</span>
                    <button
                      className="btn btn--icon"
                      onClick={() =>
                        toggleFavorite(track.id, isFavorite(track.id))
                      }
                    >
                      <HeartIcon
                        className={`btn__favorite ${
                          isFavorite(track.id) ? 'btn__favorite--active' : ''
                        }`}
                        width={24}
                        height={24}
                      />
                    </button>
                  </div>
                  <span className="player__track-artist">{track.artist}</span>
                </div>
              </>
            )}
          </div>

          <div className="player__control">
            <div className="player__btns">
              <Button
                type="button"
                className="btn btn--icon btn--light-text player__skip-btn"
                onClick={() => skipSeconds(-10)}
              >
                -10s
              </Button>
              <Button
                type="button"
                className="btn btn--icon player__next-btn"
                onClick={onPrev}
                isDisabled={!track}
              >
                <BackIcon width={16} height={16} />
              </Button>
              <Button
                type="button"
                className="btn btn--icon"
                onClick={togglePlayPause}
                isDisabled={!track}
              >
                {isPlaying ? (
                  <PauseIcon width={40} height={40} />
                ) : (
                  <PlayIcon width={40} height={40} />
                )}
              </Button>
              <Button
                type="button"
                className="btn btn--icon player__prev-btn"
                onClick={onNext}
                isDisabled={!track}
              >
                <ForwardIcon width={16} height={16} />
              </Button>
              <Button
                type="button"
                className="btn btn--icon btn--light-text player__skip-btn"
                onClick={() => skipSeconds(10)}
              >
                +10s
              </Button>
            </div>

            {track && (
              <div className="player__progress">
                <span className="player__time">{formatTime(currentTime)}</span>
                <div className="player__scale" onClick={handleProgressClick}>
                  <div
                    className="player__slider"
                    style={{
                      width: `${
                        (currentTime / (audioRef.current?.duration || 1)) * 100
                      }%`,
                    }}
                  />
                </div>
                <span className="player__time">
                  {audioRef.current?.duration
                    ? formatTime(audioRef.current.duration)
                    : '0:00'}
                </span>
              </div>
            )}

            <audio
              ref={audioRef}
              controls={false}
              style={{
                width: '100%',
                outline: 'none',
                marginTop: '10px',
              }}
              onEnded={onNext}
              onTimeUpdate={handleTimeUpdate}
            />
          </div>
          <div className="player__volume">
            <SpeakerIcon width={16} height={16} />
            <input
              className="player__volume-input"
              id="volume"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              style={
                {
                  '--thumb-position': `${volume * 100}%`,
                } as React.CSSProperties
              }
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
