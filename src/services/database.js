/**
 * Azwatan Database Service
 * Provides full CRUD operations for Songs, Languages, Types, and Tags.
 * Complies with PRD #36, #37, #38, #39, #40, #73.
 */

const STORAGE_KEYS = {
  SONGS: 'azwatan_songs_v1',
  LANGUAGES: 'azwatan_languages_v1',
  TYPES: 'azwatan_types_v1',
  TAGS: 'azwatan_tags_v1',
};

// Initial languages per PRD #10 & #38
export const INITIAL_LANGUAGES = [
  { id: 'all', name: 'Semua', active: true },
  { id: 'id', name: 'Indonesia', active: true },
  { id: 'ar', name: 'Arab', active: true },
  { id: 'ms', name: 'Melayu', active: true },
  { id: 'en', name: 'Inggris', active: true },
  { id: 'other', name: 'Lainnya', active: true },
];

// Initial types per PRD #11 & #39
export const INITIAL_TYPES = [
  { id: 'all', name: 'Semua', active: true },
  { id: 'nasyid', name: 'Nasyid', active: true },
  { id: 'sholawat', name: 'Sholawat', active: true },
  { id: 'acapella', name: 'Acapella', active: true },
];

// Initial tags per PRD #12 & #40
export const INITIAL_TAGS = [
  'Ramadhan',
  'Nasihat',
  'Hijrah',
  'Dzikir',
  'Sholawat',
  'Akhlak',
  'Keluarga',
  'Persaudaraan',
  'Cinta Rasul',
  'Renungan',
];

// Initial songs per PRD #73: 5 distinct test variations + 1 draft example
export const INITIAL_SONGS = [
  {
    id: 'song-001',
    title: 'Qamarun Sidnan Nabi',
    artist: 'Mostafa Atef',
    language: 'Arab',
    type: 'Nasyid',
    tags: ['Cinta Rasul', 'Nasihat', 'Sholawat'],
    description: 'Pujian merdu dan tenang kepada Baginda Nabi Muhammad SAW dalam langgam Maqam Rast nan agung.',
    coverUrl: '/covers/cover-arab.jpg',
    audioUrl: '/audio/qamarun.wav',
    duration: 48,
    featured: true,
    status: 'published',
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'song-002',
    title: 'Ya Nabi Salam Alaika',
    artist: 'Maher Zain & Ensemble',
    language: 'Arab',
    type: 'Sholawat',
    tags: ['Sholawat', 'Cinta Rasul', 'Dzikir'],
    description: 'Sholawat salam yang menenangkan hati, membawa keteduhan batin dan kehangatan rasa cinta.',
    coverUrl: '/covers/cover-sholawat.jpg',
    audioUrl: '/audio/ya-nabi-salam.wav',
    duration: 52,
    featured: true,
    status: 'published',
    createdAt: '2026-03-05T12:00:00Z',
    updatedAt: '2026-03-05T12:00:00Z',
  },
  {
    id: 'song-003',
    title: 'Rindu Muhammadku',
    artist: 'Haddad Alwi feat. Anti',
    language: 'Indonesia',
    type: 'Nasyid',
    tags: ['Cinta Rasul', 'Keluarga', 'Akhlak'],
    description: 'Lantunan kerinduan mendalam kepada suri teladan umat manusia dalam bahasa Indonesia yang lembut.',
    coverUrl: '/covers/cover-nusantara.jpg',
    audioUrl: '/audio/rindu-muhammadku.wav',
    duration: 45,
    featured: false,
    status: 'published',
    createdAt: '2026-03-10T14:30:00Z',
    updatedAt: '2026-03-10T14:30:00Z',
  },
  {
    id: 'song-004',
    title: 'Sepohon Kayu Daunnya Rimbun',
    artist: 'Raihan',
    language: 'Melayu',
    type: 'Nasyid',
    tags: ['Nasihat', 'Renungan', 'Akhlak'],
    description: 'Nasihat klasik Melayu tentang pentingnya shalat dan amalan kebajikan sebagai bekal kehidupan.',
    coverUrl: '/covers/cover-arab.jpg',
    audioUrl: '/audio/sepohon-kayu.wav',
    duration: 42,
    featured: true,
    status: 'published',
    createdAt: '2026-03-15T09:15:00Z',
    updatedAt: '2026-03-15T09:15:00Z',
  },
  {
    id: 'song-005',
    title: 'Renungan Jiwa & Hati',
    artist: 'Harmoni Snada',
    language: 'Indonesia',
    type: 'Acapella',
    tags: ['Renungan', 'Dzikir', 'Hijrah'],
    description: 'Harmonisasi vokal acapella murni tanpa instrumen petik, menghadirkan muhasabah diri nan hening.',
    coverUrl: '/covers/cover-nusantara.jpg',
    audioUrl: '/audio/renungan-jiwa.wav',
    duration: 50,
    featured: false,
    status: 'published',
    createdAt: '2026-03-20T11:00:00Z',
    updatedAt: '2026-03-20T11:00:00Z',
  },
  {
    id: 'song-006',
    title: 'Tholama Ashku Ghoromi (Persiapan Album)',
    artist: 'Mishary Rashid Alafasy',
    language: 'Arab',
    type: 'Nasyid',
    tags: ['Cinta Rasul', 'Ramadhan'],
    description: 'Draf rekaman awal yang masih dalam peninjauan admin sebelum dipublikasikan.',
    coverUrl: '/covers/cover-sholawat.jpg',
    audioUrl: '/audio/ya-nabi-salam.wav',
    duration: 52,
    featured: false,
    status: 'draft',
    createdAt: '2026-03-25T16:00:00Z',
    updatedAt: '2026-03-25T16:00:00Z',
  },
];

// Helper to get items
function getLocalItem(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

// Helper to set items
function setLocalItem(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

export const DatabaseService = {
  // ---- SONGS ----
  getSongs() {
    return getLocalItem(STORAGE_KEYS.SONGS, INITIAL_SONGS);
  },

  getPublishedSongs() {
    return this.getSongs().filter((s) => s.status === 'published');
  },

  getFeaturedSongs() {
    return this.getPublishedSongs().filter((s) => s.featured);
  },

  getSongById(id) {
    return this.getSongs().find((s) => s.id === id) || null;
  },

  saveSong(songData) {
    const songs = this.getSongs();
    const now = new Date().toISOString();
    
    if (songData.id) {
      // Edit
      const index = songs.findIndex((s) => s.id === songData.id);
      if (index !== -1) {
        songs[index] = {
          ...songs[index],
          ...songData,
          updatedAt: now,
        };
        setLocalItem(STORAGE_KEYS.SONGS, songs);
        return songs[index];
      }
    }

    // New Song
    const newSong = {
      ...songData,
      id: songData.id || `song-${Date.now()}`,
      status: songData.status || 'draft',
      featured: Boolean(songData.featured),
      createdAt: now,
      updatedAt: now,
    };
    songs.unshift(newSong);
    setLocalItem(STORAGE_KEYS.SONGS, songs);
    return newSong;
  },

  deleteSong(id) {
    const songs = this.getSongs().filter((s) => s.id !== id);
    setLocalItem(STORAGE_KEYS.SONGS, songs);
    return true;
  },

  togglePublish(id) {
    const songs = this.getSongs();
    const song = songs.find((s) => s.id === id);
    if (song) {
      song.status = song.status === 'published' ? 'draft' : 'published';
      song.updatedAt = new Date().toISOString();
      setLocalItem(STORAGE_KEYS.SONGS, songs);
      return song;
    }
    return null;
  },

  toggleFeatured(id) {
    const songs = this.getSongs();
    const song = songs.find((s) => s.id === id);
    if (song) {
      song.featured = !song.featured;
      song.updatedAt = new Date().toISOString();
      setLocalItem(STORAGE_KEYS.SONGS, songs);
      return song;
    }
    return null;
  },

  // ---- LANGUAGES ----
  getLanguages() {
    return getLocalItem(STORAGE_KEYS.LANGUAGES, INITIAL_LANGUAGES);
  },

  saveLanguages(languages) {
    setLocalItem(STORAGE_KEYS.LANGUAGES, languages);
  },

  // ---- TYPES ----
  getTypes() {
    return getLocalItem(STORAGE_KEYS.TYPES, INITIAL_TYPES);
  },

  saveTypes(types) {
    setLocalItem(STORAGE_KEYS.TYPES, types);
  },

  // ---- TAGS ----
  getTags() {
    return getLocalItem(STORAGE_KEYS.TAGS, INITIAL_TAGS);
  },

  saveTags(tags) {
    setLocalItem(STORAGE_KEYS.TAGS, tags);
  },

  // Reset to default data if needed
  resetToDefaults() {
    setLocalItem(STORAGE_KEYS.SONGS, INITIAL_SONGS);
    setLocalItem(STORAGE_KEYS.LANGUAGES, INITIAL_LANGUAGES);
    setLocalItem(STORAGE_KEYS.TYPES, INITIAL_TYPES);
    setLocalItem(STORAGE_KEYS.TAGS, INITIAL_TAGS);
  },
};
