import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { generateOGImage } from '@fumadocs/base-ui/og';

const assets = Promise.all([
  readFile(path.join(process.cwd(), 'lib/og-assets/NotoSansSC-Medium.ttf')),
  readFile(path.join(process.cwd(), 'public/WHUDAYS.png')),
]);

export async function pageOGImage(title: string, description: string) {
  const [font, logo] = await assets;
  // Local fonts cover Chinese/Japanese. Decorative emoji must not trigger
  // Next's remote emoji fetches during an otherwise offline static build.
  const text = title.replace(/[\p{Extended_Pictographic}\uFE0F\u200B-\u200D\u2060]/gu, '').trim();
  const titleSize = text.length > 38 ? 42 : text.length > 24 ? 52 : 64;
  return generateOGImage({
    title: <span style={{ fontSize: titleSize, lineHeight: 1.35 }}>{text}</span>,
    description: <span style={{ fontSize: 28, lineHeight: 1.6 }}>{description}</span>,
    site: <span style={{ fontSize: 30 }}>武汉大学动漫协会 · WHUDAYS</span>,
    icon: <img src={`data:image/png;base64,${logo.toString('base64')}`} width={64} height={64} />,
    primaryColor: '#4699a8', primaryTextColor: '#a3d5dd',
    fonts: [{ name: 'Noto Sans SC', data: font.buffer.slice(font.byteOffset, font.byteOffset + font.byteLength), weight: 500 }],
  });
}
