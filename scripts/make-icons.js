// Quick PNG generator using Node built-in zlib
import { deflateSync } from 'node:zlib';
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ICONS_DIR = resolve(__dirname, '../device-mode-extension/icons');

function crc32(buf) {
  let table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ (-1)) >>> 0;
}

function createChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  const toCrc = Buffer.concat([typeBuf, data]);
  crcBuf.writeUInt32BE(crc32(toCrc), 0);
  return Buffer.concat([len, toCrc, crcBuf]);
}

function createSolidPng(size, r, g, b) {
  const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]); // PNG magic
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr.writeUInt8(8, 8); // 8-bit
  ihdr.writeUInt8(6, 9); // RGBA
  ihdr.writeUInt8(0, 10);
  ihdr.writeUInt8(0, 11);
  ihdr.writeUInt8(0, 12);

  const raw = Buffer.alloc(size * (size * 4 + 1));
  let offset = 0;
  for (let y = 0; y < size; y++) {
    raw.writeUInt8(0, offset++); // Filter: None
    for (let x = 0; x < size; x++) {
      // Rounded mobile phone shape
      const cx = x - size / 2;
      const cy = y - size / 2;
      const dist = Math.sqrt(cx * cx + cy * cy);
      if (dist < size * 0.44) {
        raw.writeUInt8(r, offset++);
        raw.writeUInt8(g, offset++);
        raw.writeUInt8(b, offset++);
        raw.writeUInt8(255, offset++);
      } else {
        raw.writeUInt8(0, offset++);
        raw.writeUInt8(0, offset++);
        raw.writeUInt8(0, offset++);
        raw.writeUInt8(0, offset++);
      }
    }
  }

  const idatData = deflateSync(raw);
  const idat = createChunk('IDAT', idatData);
  const ihdrChunk = createChunk('IHDR', ihdr);
  const iend = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([header, ihdrChunk, idat, iend]);
}

[16, 48, 128].forEach((size) => {
  const png = createSolidPng(size, 37, 99, 235); // #2563EB Blue
  writeFileSync(resolve(ICONS_DIR, `icon-${size}.png`), png);
  console.log(`Generated icon-${size}.png`);
});

