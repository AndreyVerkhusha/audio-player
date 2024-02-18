import music_1 from './music_1.mp3'
import music_2 from './music_2.mp3'
import music_3 from './music_3.mp3'

export const mocksAudio: Record<'sound' | 'preview' | 'name', string>[] = [
  {
    sound: music_1,
    preview: 'https://cdn.bensound.com/image/cover/diffiebosman-winterbeams.webp',
    name: 'Del Shannon - Runaway ',
  },
  {
    sound: music_2,
    preview: 'https://cdn.bensound.com/image/cover/vital-morningcoffee.webp',
    name: 'Elvis Presley',
  },
  {
    sound: music_3,
    preview: 'https://cdn.bensound.com/image/cover/dreams.webp',
    name: 'Melancholy Lull',
  },
]
