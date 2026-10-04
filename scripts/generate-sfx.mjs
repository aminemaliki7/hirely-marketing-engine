import {writeFileSync, mkdirSync} from "node:fs";
import {dirname, join} from "node:path";
import {fileURLToPath} from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "audio");
mkdirSync(outDir, {recursive: true});

const SAMPLE_RATE = 44100;

const clamp = (value) => Math.max(-1, Math.min(1, value));

const writeWav = (name, samples) => {
  const dataSize = samples.length * 2;
  const buffer = Buffer.alloc(44 + dataSize);
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);
  for (let i = 0; i < samples.length; i++) {
    buffer.writeInt16LE(Math.round(clamp(samples[i]) * 32767), 44 + i * 2);
  }
  writeFileSync(join(outDir, name), buffer);
};

const seconds = (value) => Math.round(value * SAMPLE_RATE);

const envelope = (i, length, attack = 0.01, release = 0.2) => {
  const a = Math.max(1, Math.round(length * attack));
  const r = Math.max(1, Math.round(length * release));
  if (i < a) return i / a;
  if (i > length - r) return Math.max(0, (length - i) / r);
  return 1;
};

const sine = (i, hz) => Math.sin((2 * Math.PI * hz * i) / SAMPLE_RATE);

const noise = () => Math.random() * 2 - 1;

const whoosh = () => {
  const length = seconds(0.42);
  let prev = 0;
  return Array.from({length}, (_, i) => {
    const t = i / length;
    const raw = noise();
    const filtered = raw - prev * 0.65;
    prev = raw;
    const tone = sine(i, 180 + t * 920) * 0.22;
    return (filtered * 0.55 + tone) * envelope(i, length, 0.12, 0.45);
  });
};

const pop = () => {
  const length = seconds(0.16);
  return Array.from({length}, (_, i) => {
    const click = i < 40 ? noise() * 0.25 : 0;
    return (sine(i, 420) * Math.exp(-i / 900) + click) * envelope(i, length, 0.01, 0.6);
  });
};

const click = () => {
  const length = seconds(0.08);
  return Array.from({length}, (_, i) => {
    const burst = i < 90 ? noise() * Math.exp(-i / 18) : 0;
    return burst * 0.7;
  });
};

const impact = () => {
  const length = seconds(0.38);
  return Array.from({length}, (_, i) => {
    const low = sine(i, 72) * Math.exp(-i / 1800);
    const mid = sine(i, 140) * Math.exp(-i / 1100) * 0.45;
    const hit = i < 120 ? noise() * 0.2 : 0;
    return (low + mid + hit) * envelope(i, length, 0.005, 0.55);
  });
};

const notification = () => {
  const length = seconds(0.36);
  return Array.from({length}, (_, i) => {
    const first = sine(i, 880) * Math.exp(-i / 1400);
    const second = i > seconds(0.12) ? sine(i, 1320) * Math.exp(-(i - seconds(0.12)) / 1300) : 0;
    return (first * 0.55 + second * 0.7) * envelope(i, length, 0.02, 0.35);
  });
};

writeWav("whoosh.wav", whoosh());
writeWav("pop.wav", pop());
writeWav("click.wav", click());
writeWav("impact.wav", impact());
writeWav("notification.wav", notification());

console.log(`Wrote SFX to ${outDir}`);
