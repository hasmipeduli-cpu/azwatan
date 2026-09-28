import fs from 'fs';
import path from 'path';

// Helper to write standard 44.1kHz 16-bit mono or stereo WAV file
function createWavBuffer(sampleRate, durationSeconds, generateSample) {
  const numSamples = Math.floor(sampleRate * durationSeconds);
  const blockAlign = 2; // 1 channel * 16-bit = 2 bytes
  const byteRate = sampleRate * blockAlign;
  const dataSize = numSamples * blockAlign;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt subchunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  buffer.writeUInt16LE(1, 20); // AudioFormat (1 for PCM)
  buffer.writeUInt16LE(1, 22); // NumChannels (1 = Mono)
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34); // BitsPerSample

  // data subchunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    let sample = generateSample(t, durationSeconds);
    // Clamp to [-1, 1]
    sample = Math.max(-1, Math.min(1, sample));
    const intSample = Math.floor(sample < 0 ? sample * 32768 : sample * 32767);
    buffer.writeInt16LE(intSample, offset);
    offset += 2;
  }

  return buffer;
}

const sampleRate = 44100;
const dir = path.join(process.cwd(), 'public', 'audio');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// 1. Qamarun (Maqam Rast / Bayati melodic soothing nasheed tones)
const qamarun = createWavBuffer(sampleRate, 48, (t, dur) => {
  const env = Math.sin((Math.PI * t) / dur);
  // Melodic notes: D4 (293.66), F4 (349.23), G4 (392.00), A4 (440.00), C5 (523.25)
  const notes = [293.66, 349.23, 392.00, 440.00, 392.00, 349.23, 293.66, 261.63];
  const noteIdx = Math.floor((t * 1.5) % notes.length);
  const freq = notes[noteIdx];
  const noteFrac = (t * 1.5) % 1;
  const noteEnv = Math.sin(Math.PI * noteFrac) * Math.exp(-noteFrac * 1.5);
  
  // Warm harmonic timbre
  const voice = Math.sin(2 * Math.PI * freq * t) * 0.4 +
                Math.sin(2 * Math.PI * (freq * 2) * t) * 0.15 +
                Math.sin(2 * Math.PI * (freq * 3) * t) * 0.05;

  // Gentle acoustic sub-drone
  const drone = Math.sin(2 * Math.PI * 146.83 * t) * 0.15;
  return (voice * noteEnv + drone) * env * 0.75;
});
fs.writeFileSync(path.join(dir, 'qamarun.wav'), qamarun);

// 2. Ya Nabi Salam Alaika (Nahawand devotional acoustic hum & chime)
const yaNabi = createWavBuffer(sampleRate, 52, (t, dur) => {
  const env = Math.sin((Math.PI * t) / dur);
  const notes = [220.00, 246.94, 261.63, 293.66, 329.63, 293.66, 261.63, 220.00];
  const noteIdx = Math.floor((t * 1.2) % notes.length);
  const freq = notes[noteIdx];
  const noteFrac = (t * 1.2) % 1;
  const noteEnv = Math.sin(Math.PI * Math.pow(noteFrac, 0.6)) * Math.exp(-noteFrac * 1.2);

  const voice = Math.sin(2 * Math.PI * freq * t) * 0.45 +
                Math.sin(2 * Math.PI * freq * 1.5 * t) * 0.1 +
                Math.sin(2 * Math.PI * freq * 2 * t) * 0.12;
  const pad = (Math.sin(2 * Math.PI * 110 * t) + Math.sin(2 * Math.PI * 164.81 * t)) * 0.12;
  return (voice * noteEnv + pad) * env * 0.8;
});
fs.writeFileSync(path.join(dir, 'ya-nabi-salam.wav'), yaNabi);

// 3. Rindu Muhammadku (Gentle Nusantara reflective nasheed)
const rindu = createWavBuffer(sampleRate, 45, (t, dur) => {
  const env = Math.sin((Math.PI * t) / dur);
  const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 392.00, 329.63, 261.63];
  const noteIdx = Math.floor((t * 1.8) % notes.length);
  const freq = notes[noteIdx];
  const noteFrac = (t * 1.8) % 1;
  const noteEnv = Math.sin(Math.PI * noteFrac) * Math.exp(-noteFrac * 1.8);

  const melody = Math.sin(2 * Math.PI * freq * t) * 0.5 + Math.sin(2 * Math.PI * freq * 2 * t) * 0.15;
  const bass = Math.sin(2 * Math.PI * 130.81 * t) * 0.2;
  return (melody * noteEnv + bass) * env * 0.75;
});
fs.writeFileSync(path.join(dir, 'rindu-muhammadku.wav'), rindu);

// 4. Sepohon Kayu (Classic Melayu didactic nasheed cadence)
const sepohon = createWavBuffer(sampleRate, 42, (t, dur) => {
  const env = Math.sin((Math.PI * t) / dur);
  const notes = [196.00, 220.00, 246.94, 293.66, 329.63, 293.66, 246.94, 196.00];
  const noteIdx = Math.floor((t * 1.3) % notes.length);
  const freq = notes[noteIdx];
  const noteFrac = (t * 1.3) % 1;
  const noteEnv = Math.sin(Math.PI * noteFrac) * Math.exp(-noteFrac * 1.4);

  const melody = Math.sin(2 * Math.PI * freq * t) * 0.45 + Math.sin(2 * Math.PI * freq * 3 * t) * 0.08;
  const drone = Math.sin(2 * Math.PI * 98.00 * t) * 0.22;
  return (melody * noteEnv + drone) * env * 0.75;
});
fs.writeFileSync(path.join(dir, 'sepohon-kayu.wav'), sepohon);

// 5. Renungan Jiwa (Peaceful Acapella vocal harmonies)
const renungan = createWavBuffer(sampleRate, 50, (t, dur) => {
  const env = Math.sin((Math.PI * t) / dur);
  const chordA = [174.61, 220.00, 261.63, 349.23];
  const chordB = [164.81, 196.00, 246.94, 329.63];
  const chord = Math.floor(t / 4) % 2 === 0 ? chordA : chordB;
  
  let val = 0;
  for (const f of chord) {
    val += Math.sin(2 * Math.PI * f * t) * 0.15;
    val += Math.sin(2 * Math.PI * (f * 2) * t) * 0.04;
  }
  return val * env * 0.85;
});
fs.writeFileSync(path.join(dir, 'renungan-jiwa.wav'), renungan);

console.log('Successfully generated 5 soothing audio files in public/audio/');
