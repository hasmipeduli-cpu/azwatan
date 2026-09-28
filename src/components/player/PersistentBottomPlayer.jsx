import React, { useRef, useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Loader2,
  Sparkles 
} from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export default function PersistentBottomPlayer() {
  const {
    activeSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isLoadingAudio,
    playbackError,
    togglePlayPause,
    seek,
    nextSong,
    previousSong,
    changeVolume,
    toggleMute,
    formatTime,
  } = useAudio();

  const scrubberRef = useRef(null);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [scrubPosition, setScrubPosition] = useState(0);

  // If no song selected, player does not render
  if (!activeSong) return null;

  const currentSec = isScrubbing ? scrubPosition : currentTime;
  const currentDuration = duration || activeSong.duration || 1;
  const progressPercent = Math.min(100, Math.max(0, (currentSec / currentDuration) * 100));

  // Handle Scrubber Interaction
  const handleScrubStart = (e) => {
    setIsScrubbing(true);
    handleScrubMove(e);
  };

  const handleScrubMove = (e) => {
    if (!scrubberRef.current) return;
    const rect = scrubberRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clickX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = clickX / rect.width;
    const newTime = percent * currentDuration;
    setScrubPosition(newTime);
  };

  const handleScrubEnd = () => {
    if (isScrubbing) {
      seek(scrubPosition);
      setIsScrubbing(false);
    }
  };

  return (
    <aside 
      className="az-player-container" 
      aria-label="Audio Player Azwatan"
      onPointerMove={isScrubbing ? handleScrubMove : undefined}
      onPointerUp={isScrubbing ? handleScrubEnd : undefined}
      onPointerCancel={isScrubbing ? handleScrubEnd : undefined}
    >
      <div className="az-container az-player-inner">
        {/* Left: Song Artwork & Details */}
        <div className="az-player-track">
          <img
            src={activeSong.coverUrl || '/covers/cover-arab.jpg'}
            alt={activeSong.title}
            className="az-player-cover"
            onError={(e) => {
              e.currentTarget.src = '/covers/cover-arab.jpg';
            }}
          />
          <div className="az-player-meta">
            <h4 className="az-player-title" title={activeSong.title}>
              {activeSong.title}
            </h4>
            <p className="az-player-artist" title={activeSong.artist}>
              {activeSong.artist} • <span style={{ color: 'var(--emerald-700)', fontWeight: 600 }}>{activeSong.language}</span>
            </p>
          </div>
        </div>

        {/* Center: Controls & Scrubber */}
        <div className="az-player-center">
          <div className="az-player-controls">
            <button
              type="button"
              className="az-control-btn"
              onClick={previousSong}
              title="Lagu Sebelumnya (Previous)"
              aria-label="Lagu Sebelumnya"
            >
              <SkipBack size={18} />
            </button>

            <button
              type="button"
              className="az-control-btn play-pause"
              onClick={togglePlayPause}
              title={isPlaying ? 'Jeda' : 'Putar'}
              aria-label={isPlaying ? 'Jeda audio' : 'Putar audio'}
            >
              {isLoadingAudio ? (
                <Loader2 size={18} className="az-spin" />
              ) : isPlaying ? (
                <Pause size={18} fill="currentColor" />
              ) : (
                <Play size={18} fill="currentColor" style={{ marginLeft: '2px' }} />
              )}
            </button>

            <button
              type="button"
              className="az-control-btn"
              onClick={nextSong}
              title="Lagu Berikutnya (Next)"
              aria-label="Lagu Berikutnya"
            >
              <SkipForward size={18} />
            </button>
          </div>

          {/* Scrubber Progress Bar */}
          <div className="az-player-progress-row">
            <span className="az-time-text">{formatTime(currentSec)}</span>

            <div
              ref={scrubberRef}
              className="az-scrubber-track"
              onPointerDown={handleScrubStart}
              role="slider"
              aria-valuemin={0}
              aria-valuemax={Math.floor(currentDuration)}
              aria-valuenow={Math.floor(currentSec)}
              aria-label="Bilah kemajuan lagu"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') seek(currentTime + 5);
                if (e.key === 'ArrowLeft') seek(currentTime - 5);
              }}
            >
              <div 
                className="az-scrubber-fill" 
                style={{ width: `${progressPercent}%` }}
              />
              <div 
                className="az-scrubber-thumb" 
                style={{ left: `${progressPercent}%` }}
              />
            </div>

            <span className="az-time-text">{formatTime(currentDuration)}</span>
          </div>

          {playbackError && (
            <div style={{ fontSize: '0.72rem', color: 'var(--color-danger)', marginTop: '-2px' }}>
              {playbackError}
            </div>
          )}
        </div>

        {/* Right: Volume & Queue Status */}
        <div className="az-player-right">
          <button
            type="button"
            className="az-control-btn"
            onClick={toggleMute}
            title={isMuted ? 'Bunyikan' : 'Senyapkan'}
            aria-label="Bisu atau Aktifkan Suara"
          >
            {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => changeVolume(parseFloat(e.target.value))}
            className="az-volume-slider"
            title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
            aria-label="Volume audio"
          />
        </div>
      </div>
    </aside>
  );
}
