import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const audioRef = useRef(null);

  const [activeSong, setActiveSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [queue, setQueue] = useState([]);
  const [playbackError, setPlaybackError] = useState(null);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);

  // Initialize audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audioRef.current = audio;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setIsLoadingAudio(false);
    };

    const onWaiting = () => {
      setIsLoadingAudio(true);
    };

    const onCanPlay = () => {
      setIsLoadingAudio(false);
    };

    const onPlay = () => {
      setIsPlaying(true);
      setPlaybackError(null);
    };

    const onPause = () => {
      setIsPlaying(false);
    };

    const onError = (e) => {
      console.warn('Audio playback error:', e);
      setIsPlaying(false);
      setIsLoadingAudio(false);
      setPlaybackError('Audio tidak dapat diputar. Silakan coba lagi.');
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
    };
  }, []);

  // Update MediaSession API for lockscreen & notification controls
  useEffect(() => {
    if ('mediaSession' in navigator && activeSong) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: activeSong.title,
        artist: activeSong.artist,
        album: 'Azwatan Nasyid Library',
        artwork: [
          { src: activeSong.coverUrl || '/favicon.svg', sizes: '512x512', type: 'image/jpeg' },
        ],
      });
    }
  }, [activeSong]);

  // Handle Play Song
  const playSong = useCallback((song, customQueue) => {
    if (!song) return;

    if (customQueue && Array.isArray(customQueue)) {
      setQueue(customQueue);
    }

    const audio = audioRef.current;
    if (!audio) return;

    // If same song, just toggle play
    if (activeSong && activeSong.id === song.id) {
      if (audio.paused) {
        audio.play().catch((err) => {
          console.warn('Playback resume issue:', err);
        });
      }
      return;
    }

    // New song
    setActiveSong(song);
    setCurrentTime(0);
    setDuration(song.duration || 0);
    setIsLoadingAudio(true);
    setPlaybackError(null);

    audio.src = song.audioUrl;
    audio.volume = isMuted ? 0 : volume;
    audio.play().catch((err) => {
      console.warn('Audio play request failed:', err);
      // Often blocked by browser autoplay policy before user interaction
    });
  }, [activeSong, volume, isMuted]);

  // Toggle Play / Pause
  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !activeSong) return;

    if (audio.paused) {
      audio.play().catch((err) => console.warn(err));
    } else {
      audio.pause();
    }
  }, [activeSong]);

  // Seek
  const seek = useCallback((seconds) => {
    const audio = audioRef.current;
    if (!audio) return;
    const clamped = Math.max(0, Math.min(seconds, audio.duration || duration || 0));
    audio.currentTime = clamped;
    setCurrentTime(clamped);
  }, [duration]);

  // Next Song in Queue (PRD #18 & #20)
  const nextSong = useCallback(() => {
    if (!activeSong || queue.length === 0) return;
    const currentIndex = queue.findIndex((s) => s.id === activeSong.id);
    if (currentIndex === -1) {
      // If not in queue, play first
      playSong(queue[0]);
    } else if (currentIndex < queue.length - 1) {
      playSong(queue[currentIndex + 1]);
    } else {
      // Loop back to beginning of active queue
      playSong(queue[0]);
    }
  }, [activeSong, queue, playSong]);

  // Previous Song (PRD #19)
  const previousSong = useCallback(() => {
    const audio = audioRef.current;
    // If playback > 3 seconds, rewind to start
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      setCurrentTime(0);
      return;
    }

    if (!activeSong || queue.length === 0) return;
    const currentIndex = queue.findIndex((s) => s.id === activeSong.id);
    if (currentIndex > 0) {
      playSong(queue[currentIndex - 1]);
    } else {
      // Wrap to end
      playSong(queue[queue.length - 1]);
    }
  }, [activeSong, queue, playSong]);

  // Auto-next on track end (PRD #18)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onEnded = () => {
      nextSong();
    };

    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('ended', onEnded);
    };
  }, [nextSong]);

  // Change Volume
  const changeVolume = (newVal) => {
    const val = Math.max(0, Math.min(1, newVal));
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : val;
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.volume = nextMuted ? 0 : volume;
    }
  };

  // Format time mm:ss
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || timeInSeconds === null) return '00:00';
    const totalSec = Math.floor(timeInSeconds);
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AudioContext.Provider
      value={{
        activeSong,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        queue,
        isLoadingAudio,
        playbackError,
        setQueue,
        playSong,
        togglePlayPause,
        seek,
        nextSong,
        previousSong,
        changeVolume,
        toggleMute,
        formatTime,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
