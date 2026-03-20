export const APP_NAME = 'VixSEO'
export const APP_DOMAIN = 'vixseo.com'

export const THEME = {
  primary: '#0F2447',
  accent: '#10B981',
  background: '#FFFFFF',
  muted: '#F4F6F9',
  destructive: '#EF4444',
} as const

export const SC_CACHE_HOURS = 12
export const SITEMAP_CACHE_HOURS = 24
export const POSTS_STALE_MINUTES = 30
export const REDIRECTS_STALE_MINUTES = 5
export const GSC_DELAY_DAYS = 3

export const WIX_API_BASE = 'https://www.wixapis.com'

export const GSC_DATE_RANGES = [
  { label: 'Son 7 Gün', value: '7d', days: 7 },
  { label: 'Son 28 Gün', value: '28d', days: 28 },
  { label: 'Son 3 Ay', value: '3m', days: 90 },
  { label: 'Son 6 Ay', value: '6m', days: 180 },
  { label: 'Son 12 Ay', value: '12m', days: 365 },
  { label: 'Son 16 Ay', value: '16m', days: 480 },
] as const

export const COUNTRY_NAMES: Record<string, string> = {
  tur: 'Türkiye',
  usa: 'ABD',
  gbr: 'İngiltere',
  deu: 'Almanya',
  fra: 'Fransa',
  nld: 'Hollanda',
  ita: 'İtalya',
  esp: 'İspanya',
  bra: 'Brezilya',
  can: 'Kanada',
  aus: 'Avustralya',
  jpn: 'Japonya',
  ind: 'Hindistan',
  rus: 'Rusya',
  chn: 'Çin',
  kor: 'Güney Kore',
  mex: 'Meksika',
  arg: 'Arjantin',
  pol: 'Polonya',
  swe: 'İsveç',
  nor: 'Norveç',
  dnk: 'Danimarka',
  fin: 'Finlandiya',
  bel: 'Belçika',
  aut: 'Avusturya',
  che: 'İsviçre',
  prt: 'Portekiz',
  grc: 'Yunanistan',
  aze: 'Azerbaycan',
  geo: 'Gürcistan',
  ukr: 'Ukrayna',
  rou: 'Romanya',
  bgr: 'Bulgaristan',
  srb: 'Sırbistan',
  hrv: 'Hırvatistan',
  hun: 'Macaristan',
  cze: 'Çekya',
  svk: 'Slovakya',
  irq: 'Irak',
  irn: 'İran',
  sau: 'Suudi Arabistan',
  are: 'BAE',
  egy: 'Mısır',
  zaf: 'Güney Afrika',
  isr: 'İsrail',
  sgp: 'Singapur',
  tha: 'Tayland',
  idn: 'Endonezya',
  mys: 'Malezya',
  pak: 'Pakistan',
}

export const DEVICE_LABELS: Record<string, string> = {
  DESKTOP: 'Masaüstü',
  MOBILE: 'Mobil',
  TABLET: 'Tablet',
}

export const SEARCH_TYPE_LABELS: Record<string, string> = {
  web: 'Web',
  image: 'Görsel',
  video: 'Video',
  news: 'Haberler',
}
