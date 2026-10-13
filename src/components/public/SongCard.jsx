import React from 'react';
import { Play, Pause, Sparkles } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import StorageImage from '../common/StorageImage';

export default function SongCard({ song, currentQueue }) {
  const { activeSong, isPlaying, playSong, togglePlayPause } = useAudio();

  const isCurrentSong = activeSong?.id === song.id;
  const isCurrentPlaying = isCurrentSong && isPlaying;

  const handlePlayClick = (e) => {
    e.stopPropagation();
    if (isCurrentSong) {
      togglePlayPause();
    } else {
      playSong(song, currentQueue);
    }
  };

  return (
    <article
      className={`az-song-card ${isCurrentSong ? 'is-active' : ''}`}
      aria-label={`${song.title} oleh ${song.artist}`}
    >
      {/* Cover Image Container. Only the play button is interactive —
          the card itself is not a button (nested interactive elements
          are an accessibility anti-pattern). */}
      <div className="az-card-cover-wrap">
        <StorageImage
          src={song.coverUrl || '/covers/cover-arab.jpg'}
          alt={`Sampul ${song.title}`}
          className="az-card-cover"
          loading="lazy"
        />

        {song.featured && (
          <div className="az-badge-featured" title="Pilihan Azwatan">
            <Sparkles size={11} />
            <span>Pilihan</span>
          </div>
        )}

        {/* Play / Pause Overlay Button */}
        <button
          type="button"
          className="az-card-play-btn"
          onClick={handlePlayClick}
          aria-label={isCurrentPlaying ? `Jeda ${song.title}` : `Putar ${song.title}`}
        >
          {isCurrentPlaying ? (
            <div className="az-soundwave">
              <span className="az-soundwave-bar"></span>
              <span className="az-soundwave-bar"></span>
              <span className="az-soundwave-bar"></span>
              <span className="az-soundwave-bar"></span>
            </div>
          ) : (
            <Play size={20} fill="currentColor" style={{ marginLeft: '2px' }} />
          )}
        </button>
      </div>

      {/* Card Body */}
      <div className="az-card-body">
        <h3 className="az-card-title" title={song.title}>
          {song.title}
        </h3>
        <p className="az-card-artist" title={song.artist}>
          {song.artist}
        </p>

        {/* Metadata Badges */}
        <div className="az-card-meta">
          <span className="az-tag-pill lang">{song.language}</span>
          <span className="az-card-dot">•</span>
          <span className="az-tag-pill">{song.type}</span>
          {song.tags && song.tags.length > 0 && (
            <>
              <span className="az-card-dot">•</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                #{song.tags[0]}
              </span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
