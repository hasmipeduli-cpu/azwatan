import React, { useState, useMemo, useEffect } from 'react';
import HeroSection from '../components/public/HeroSection';
import FilterBar from '../components/public/FilterBar';
import FeaturedSection from '../components/public/FeaturedSection';
import SongLibrary from '../components/public/SongLibrary';
import { DatabaseService } from '../services/database';
import { useAudio } from '../context/AudioContext';

export default function HomePage() {
  const [songs, setSongs] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('Semua');
  const [selectedType, setSelectedType] = useState('Semua');

  const { setQueue } = useAudio();

  // Load published data
  useEffect(() => {
    // Simulate brief smooth initial fetch
    const timer = setTimeout(() => {
      const published = DatabaseService.getPublishedSongs();
      setSongs(published);
      setLanguages(DatabaseService.getLanguages());
      setTypes(DatabaseService.getTypes());
      setIsLoading(false);
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  // Filter songs based on Search + Language + Type + Tags (PRD #9, #10, #11, #12)
  const filteredSongs = useMemo(() => {
    let result = songs;

    // Search query filter (matches title, artist, language, type, tags)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((song) => {
        const titleMatch = song.title?.toLowerCase().includes(q);
        const artistMatch = song.artist?.toLowerCase().includes(q);
        const langMatch = song.language?.toLowerCase().includes(q);
        const typeMatch = song.type?.toLowerCase().includes(q);
        const tagsMatch = song.tags?.some((tag) => tag.toLowerCase().includes(q));
        const descMatch = song.description?.toLowerCase().includes(q);
        return titleMatch || artistMatch || langMatch || typeMatch || tagsMatch || descMatch;
      });
    }

    // Language filter
    if (selectedLanguage && selectedLanguage !== 'Semua') {
      result = result.filter(
        (song) => song.language?.toLowerCase() === selectedLanguage.toLowerCase()
      );
    }

    // Type filter
    if (selectedType && selectedType !== 'Semua') {
      result = result.filter(
        (song) => song.type?.toLowerCase() === selectedType.toLowerCase()
      );
    }

    return result;
  }, [songs, searchQuery, selectedLanguage, selectedType]);

  // Update active queue in player whenever filtered songs change (PRD #20)
  useEffect(() => {
    if (filteredSongs.length > 0) {
      setQueue(filteredSongs);
    }
  }, [filteredSongs, setQueue]);

  // Featured songs: shown when no query/filter narrows down results (PRD #13)
  const featuredSongs = useMemo(() => {
    return songs.filter((s) => s.featured);
  }, [songs]);

  const showFeaturedSection = !searchQuery && selectedLanguage === 'Semua' && selectedType === 'Semua';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedLanguage('Semua');
    setSelectedType('Semua');
  };

  return (
    <main className="az-home-page">
      {/* Hero with Search */}
      <HeroSection 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />

      <div className="az-container">
        {/* Filter Bar */}
        <FilterBar
          languages={languages}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          types={types}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        {/* Featured Section (Pilihan Azwatan) */}
        {showFeaturedSection && !isLoading && (
          <FeaturedSection 
            featuredSongs={featuredSongs} 
            allSongs={filteredSongs} 
          />
        )}

        {/* Main Song Library */}
        <SongLibrary
          songs={filteredSongs}
          isLoading={isLoading}
          searchQuery={searchQuery}
          selectedLanguage={selectedLanguage}
          selectedType={selectedType}
          onResetFilters={handleResetFilters}
        />
      </div>
    </main>
  );
}
