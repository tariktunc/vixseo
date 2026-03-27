'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Table,
  Copy,
  Check,
  ArrowRight,
  FileSpreadsheet,
  Lightbulb,
  Download,
  Clock,
  Search,
  BarChart3,
  Link2,
  ClipboardList,
  Users,
  FileText,
} from 'lucide-react'
import { useState, useCallback } from 'react'
import type { LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { PageFaq } from '@/components/landing/page-faq'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Formula = {
  code: string
  title: string
  description: string
  useCase: string
}

type Template = {
  title: string
  description: string
  icon: LucideIcon
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const FORMULAS: Formula[] = [
  {
    code: '=LEN(A1)',
    title: 'Karakter Sayisi',
    description: 'Hucredeki metnin karakter sayisini hesaplar. Title ve meta description uzunluk kontrolu icin idealdir.',
    useCase: 'Title etiketinizin 60 karakteri asip asmadigini kontrol edin.',
  },
  {
    code: '=IF(LEN(A1)>60,"Cok Uzun",IF(LEN(A1)<50,"Cok Kisa","Ideal"))',
    title: 'Title Uzunluk Kontrolu',
    description: 'Title etiketinizin uzunlugunu otomatik olarak degerlendirir ve "Cok Uzun", "Cok Kisa" veya "Ideal" sonucunu verir.',
    useCase: 'Yuzlerce sayfanin title uzunlugunu toplu kontrol edin.',
  },
  {
    code: '=SUBSTITUTE(LOWER(A1)," ","-")',
    title: 'URL Slug Olusturucu',
    description: 'Metni kucuk harfe cevirir ve bosluklari tire ile degistirerek SEO uyumlu URL slug\'i olusturur.',
    useCase: 'Blog basliklarindan otomatik URL slug\'i uretin.',
  },
  {
    code: '=REGEXMATCH(A1,"https?://")',
    title: 'URL Format Kontrolu',
    description: 'Hucredeki metnin gecerli bir URL formati icerip icermedigini kontrol eder. TRUE veya FALSE sonucu verir.',
    useCase: 'Buyuk URL listelerinde format hatalarini hizla tespit edin.',
  },
  {
    code: '=IMPORTXML(A1,"//title")',
    title: 'Sayfadan Title Cekme',
    description: 'Belirtilen URL\'deki sayfanin title etiketini otomatik olarak ceker. Toplu SEO denetimi icin kullanislidir.',
    useCase: 'Rakip sitelerin title etiketlerini analiz edin.',
  },
  {
    code: '=IMPORTXML(A1,"//meta[@name=\'description\']/@content")',
    title: 'Meta Description Cekme',
    description: 'Belirtilen URL\'deki sayfanin meta description icerigini otomatik olarak ceker.',
    useCase: 'Kendi sayfalarinizin veya rakiplerinizin meta description\'larini toplu inceleyin.',
  },
  {
    code: '=GOOGLETRANSLATE(A1,"en","tr")',
    title: 'Icerik Cevirisi',
    description: 'Hucredeki metni belirtilen dilden hedef dile cevirir. Uluslararasi SEO calismalari icin faydalidir.',
    useCase: 'Yabanci kaynaklardaki anahtar kelimeleri Turkceye cevirin.',
  },
  {
    code: '=SPARKLINE(A1:A12)',
    title: 'Trend Gorsellestirme',
    description: 'Hucre icinde mini grafik olusturarak veri trendini gorsel olarak gosterir.',
    useCase: '12 aylik siralama veya trafik verisini tek bir hucrede goruntuleyin.',
  },
  {
    code: '=COUNTIF(A:A,"*"&B1&"*")',
    title: 'Anahtar Kelime Sayaci',
    description: 'Belirli bir anahtar kelimenin sutundaki tum hucrelerde kac kez gectigini sayar.',
    useCase: 'Icerik planlama tablosunda anahtar kelime tekrarlarini tespit edin.',
  },
  {
    code: '=ARRAYFORMULA(LEN(A2:A100))',
    title: 'Toplu Uzunluk Hesabi',
    description: 'Tek bir formul ile birden fazla hucrenin karakter uzunlugunu ayni anda hesaplar.',
    useCase: 'Tum sayfalarin title uzunluklarini tek seferde hesaplayin.',
  },
]

const TEMPLATES: Template[] = [
  {
    title: 'Anahtar Kelime Arastirma Sablonu',
    description:
      'Anahtar kelime listesi, arama hacmi, zorluk puani, mevcut siralama ve hedef URL kolonlari ile kapsamli arastirma sablonu.',
    icon: Search,
  },
  {
    title: 'Icerik Takvimi Sablonu',
    description:
      'Yayin tarihi, baslik, hedef anahtar kelime, yazar, durum ve performans metrikleri ile icerik planlama takvimi.',
    icon: Clock,
  },
  {
    title: 'Backlink Takip Sablonu',
    description:
      'Kaynak URL, hedef sayfa, anchor text, dofollow/nofollow durumu ve domain otoritesi ile backlink portfoyunuzu yonetin.',
    icon: Link2,
  },
  {
    title: 'Teknik SEO Denetim Kontrol Listesi',
    description:
      'Sayfa hizi, mobil uyumluluk, indeksleme, guvenlik ve yapilandirilmis veri kontrollerini iceren kapsamli denetim listesi.',
    icon: ClipboardList,
  },
  {
    title: 'Rakip Analizi Sablonu',
    description:
      'Rakip URL\'leri, organik trafik, anahtar kelime sayisi, backlink profili ve icerik stratejisi karsilastirma tablosu.',
    icon: Users,
  },
  {
    title: 'SEO Raporlama Sablonu',
    description:
      'Aylik organik trafik, siralama degisimleri, donusum oranlari ve teknik SEO metrikleri ile profesyonel raporlama sablonu.',
    icon: BarChart3,
  },
]

const TIPS = [
  {
    title: 'IMPORTXML ile Toplu Veri Cekin',
    description:
      'IMPORTXML fonksiyonunu kullanarak yuzlerce sayfanin title, description ve H1 etiketlerini otomatik olarak cekebilirsiniz. Ancak Google Sheets\'in gunluk IMPORTXML limiti oldugunun farkinda olun.',
  },
  {
    title: 'Kosullu Bimlendirme Kullanin',
    description:
      'Title uzunlugu 60 karakteri asan hucreleri kirmizi, ideal aralikta olanlari yesil ile isaretle. Bu, binlerce satir arasinda sorunlari aninda gormenizi saglar.',
  },
  {
    title: 'ARRAYFORMULA ile Zamandan Kazanin',
    description:
      'Her satira ayri formul yazmak yerine ARRAYFORMULA kullanarak tek formul ile tum sutunu hesaplayin. Bu hem zaman kazandirir hem de dosya boyutunu kucultur.',
  },
  {
    title: 'Veri Dogrulamayi Aktif Edin',
    description:
      'Durum sutunlari icin acilir liste (dropdown) olusturun: "Yayin Bekliyor", "Yayinda", "Guncellenmeli" gibi. Bu, veri tutarliligini saglar.',
  },
  {
    title: 'Pivot Tablo ile Ozet Cikartin',
    description:
      'Buyuk veri setlerinizden pivot tablo olusturarak kategori bazli performans ozetleri cikartin. Hangi icerik turlerinin en iyi performansi gosterdigini hizla gorun.',
  },
  {
    title: 'Google Analytics Verilerini Baglayın',
    description:
      'Google Sheets eklentileri ile Google Analytics ve Search Console verilerinizi otomatik olarak cekin. Boylece raporlariniz her zaman guncel kalir.',
  },
]

const SEO_SHEETS_FAQ = [
  {
    question: 'Google Sheets SEO calismalari icin yeterli mi?',
    answer:
      'Evet, Google Sheets ozellikle kucuk ve orta olcekli SEO projeleri icin cok guclu bir aractir. IMPORTXML, REGEXMATCH ve SPARKLINE gibi fonksiyonlarla veri toplama, analiz ve raporlama islemlerini kolayca yapabilirsiniz.',
  },
  {
    question: 'IMPORTXML fonksiyonunun limitleri nelerdir?',
    answer:
      'Google Sheets, dosya basina yaklaşık 50 IMPORTXML fonksiyonu destekler. Cok fazla kullanirseniz yavaslamaya veya hatalara neden olabilir. Buyuk projeler icin verileri toplu cekmek ve degerlere yapistirmak daha verimlidir.',
  },
  {
    question: 'Sablonlari nasil kullanabilirim?',
    answer:
      'Sablonlarimiz yakin zamanda ucretsiz indirme olarak sunulacaktir. Her sablon, aciklamalar ve ornek verilerle birlikte gelecek, boylece kendi projenize kolayca uyarlayabileceksiniz.',
  },
  {
    question: 'Excel yerine neden Google Sheets?',
    answer:
      'Google Sheets, IMPORTXML ve GOOGLETRANSLATE gibi web tabanli fonksiyonlar sunar. Ayrica ekip ile gercek zamanli is birligi, otomatik kaydetme ve ucretsiz erisim avantajlari vardir.',
  },
  {
    question: 'Formuller turkce icin calisiyor mu?',
    answer:
      'Evet, tum formuller Turkce iceriklerle uyumlu calisir. LEN fonksiyonu Turkce karakterleri (ı, ö, ü, ç, ş, ğ) dogru sayar. GOOGLETRANSLATE ise Turkce ceviri destekler.',
  },
  {
    question: 'Buyuk veri setlerinde performans sorunu olur mu?',
    answer:
      'Google Sheets, 10 milyon hucreye kadar destekler ancak cok fazla IMPORTXML veya karmasik formullerle yavaslar. 10.000 satirdan fazla veri icin ARRAYFORMULA ve optimize edilmis formuller kullanmaniz onerilir.',
  },
  {
    question: 'SEO raporlarimi otomatiklestirebilir miyim?',
    answer:
      'Evet, Google Apps Script ile raporlamayi otomatiklestirebilirsiniz. Belirli aralıklarla veri cekme, e-posta ile rapor gonderme ve dashboard guncelleme islemlerini otomatik hale getirebilirsiniz.',
  },
  {
    question: 'Search Console verilerini Sheets\'e aktarabilir miyim?',
    answer:
      'Evet, Google Sheets icin Search Console eklentisi veya API baglantisi ile verilerinizi otomatik olarak cekebilirsiniz. Supermetrics ve Search Analytics for Sheets populer eklenti secenekleridir.',
  },
]

// ---------------------------------------------------------------------------
// Copy Button
// ---------------------------------------------------------------------------

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [text])

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
      title="Kopyala"
    >
      {copied ? (
        <Check className="w-4 h-4 text-emerald-400" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  )
}

// ---------------------------------------------------------------------------
// Formula Card
// ---------------------------------------------------------------------------

function FormulaCard({ formula, index }: { formula: Formula; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="bg-[#0B1528] border border-white/10 rounded-2xl p-6 hover:border-emerald-500/20 transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-base font-bold text-white">{formula.title}</h3>
        <CopyButton text={formula.code} />
      </div>

      <div className="bg-[#0A0F1C] border border-white/5 rounded-lg p-3 mb-4 font-mono text-sm text-emerald-400 overflow-x-auto">
        {formula.code}
      </div>

      <p className="text-sm text-slate-400 leading-relaxed mb-3">
        {formula.description}
      </p>

      <div className="flex items-start gap-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-3">
        <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-300">{formula.useCase}</p>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Template Card
// ---------------------------------------------------------------------------

function TemplateCard({ template, index }: { template: Template; index: number }) {
  const Icon = template.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-[#0B1528] border border-white/10 rounded-2xl p-6 hover:border-emerald-500/20 transition-colors relative"
    >
      <div className="absolute top-4 right-4">
        <span className="inline-flex items-center rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-400">
          <Clock className="w-3 h-3 mr-1" />
          Yakinda
        </span>
      </div>

      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-emerald-400" />
      </div>

      <h3 className="text-base font-bold text-white mb-2 pr-20">{template.title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{template.description}</p>

      <div className="mt-4 flex items-center gap-2 text-slate-500 text-xs">
        <Download className="w-3.5 h-3.5" />
        <span>Indirme yakin zamanda aktif olacak</span>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function SeoSheetsClient() {
  return (
    <div className="pt-24 pb-0 min-h-screen bg-[#0F2447] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-600/15 via-[#0F2447] to-[#0F2447] pointer-events-none" />

      {/* ================================================================ */}
      {/* HERO                                                             */}
      {/* ================================================================ */}
      <section className="relative z-10 text-center py-16 md:py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-400 mb-8 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Table className="w-4 h-4 mr-2" /> SEO Sheets
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 max-w-4xl mx-auto">
            Google Sheets ile SEO{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Verilerinizi Yonetin
            </span>
          </h1>

          <p className="text-lg text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            SEO calismalari icin ozel hazirlanmis Google Sheets formulleri, sablonlari ve
            ipuclari. Verilerinizi profesyonelce yonetin.
          </p>
        </motion.div>
      </section>

      {/* ================================================================ */}
      {/* FORMULA LIBRARY                                                  */}
      {/* ================================================================ */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3">
            Formul Kutuphanesi
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            SEO Icin Google Sheets Formulleri
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            SEO calismalarina ozel hazirlanmis formulleri kopyalayip hemen kullanmaya baslayin.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FORMULAS.map((formula, i) => (
            <FormulaCard key={formula.code} formula={formula} index={i} />
          ))}
        </div>
      </section>

      {/* ================================================================ */}
      {/* TEMPLATES                                                        */}
      {/* ================================================================ */}
      <section className="relative z-10 bg-[#0B1528] border-y border-white/5 py-20 md:py-28 px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3">
              Sablonlar
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Indirilebilir SEO Sablonlari
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Profesyonel SEO calismalari icin hazir sablonlar. Yakin zamanda ucretsiz indirme olarak sunulacak.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEMPLATES.map((template, i) => (
              <TemplateCard key={template.title} template={template} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* TIPS                                                             */}
      {/* ================================================================ */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 lg:px-8 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3">
            Ipuclari
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Google Sheets ile SEO Ipuclari
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            SEO calismalarda Google Sheets&apos;ten maksimum verim almak icin ipuclari.
          </p>
        </motion.div>

        <div className="space-y-4">
          {TIPS.map((tip, i) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-[#0B1528] border border-white/10 rounded-xl p-6 hover:border-emerald-500/20 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-2">{tip.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{tip.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================================================================ */}
      {/* FAQ                                                              */}
      {/* ================================================================ */}
      <PageFaq
        items={SEO_SHEETS_FAQ}
        title="SEO Sheets Hakkinda"
        subtitle="Google Sheets ile SEO calismalari hakkinda sikca sorulan sorular."
      />

      {/* ================================================================ */}
      {/* CTA                                                              */}
      {/* ================================================================ */}
      <section className="relative z-10 py-20 md:py-28 px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="bg-gradient-to-br from-[#0B1528] to-[#112240] border border-emerald-500/20 rounded-3xl p-10 md:p-16 shadow-[0_0_60px_rgba(16,185,129,0.08)]">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              SEO Verilerinizi Otomatik Yonetin
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl mx-auto">
              VixSEO ile Google Sheets&apos;e gerek kalmadan tum SEO verilerinizi tek panelden yonetin.
            </p>
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg rounded-xl px-10 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                VixSEO&apos;yu Deneyin
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
