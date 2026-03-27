'use client'

import { LandingNavbar } from '@/components/landing/landing-navbar'
import { HeroSection } from '@/components/landing/hero-section'
import { StatsBar } from '@/components/landing/stats-bar'
import { FeaturesSection } from '@/components/landing/features-section'
import { HowItWorks } from '@/components/landing/how-it-works'
import { FeatureDetails } from '@/components/landing/feature-details'
import { TestimonialsSection } from '@/components/landing/testimonials-section'
import { PageFaq } from '@/components/landing/page-faq'
import { FaqSection } from '@/components/landing/faq-section'
import { CtaSection } from '@/components/landing/cta-section'
import { LandingFooter } from '@/components/landing/landing-footer'

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <HowItWorks />
      <TestimonialsSection />
      <PageFaq
        title="VixSEO Hakkında Sıkça Sorulan Sorular"
        subtitle="VixSEO ve SEO yönetimi hakkında en çok merak edilen sorular."
        items={[
          {
            question: 'VixSEO nedir ve ne işe yarar?',
            answer: 'VixSEO, Wix platformunda oluşturulmuş web siteleri için tasarlanmış profesyonel bir SEO yönetim panelidir. Google Search Console entegrasyonu, blog yönetimi, anahtar kelime analizi ve teknik SEO denetimi gibi tüm araçları tek bir yerden sunar. Sitenizin arama motoru performansını takip etmenizi, sorunları tespit etmenizi ve iyileştirme aksiyonları almanızı kolaylaştırır.',
          },
          {
            question: 'VixSEO kimler için uygundur?',
            answer: 'VixSEO, Wix platformunda web sitesi olan bireysel girişimciler, KOBİ\'ler, dijital ajanslar ve SEO uzmanları için idealdir. Teknik bilgi gerektirmeyen arayüzü sayesinde SEO\'ya yeni başlayanlar da kolayca kullanabilir. Çoklu işletme desteği ile birden fazla siteyi yöneten ajanslar ve danışmanlar için de mükemmel bir çözümdür.',
          },
          {
            question: 'Google Search Console verilerimi nasıl kullanıyor?',
            answer: 'VixSEO, Google Search Console API üzerinden tıklama, gösterim, CTR ve ortalama sıralama verilerinizi otomatik olarak çeker. Bu veriler anlaşılır grafik ve tablolar halinde görselleştirilir. Fırsat kelimeleri, düşen sıralamalar ve CTR optimizasyonu gibi aksiyon alınabilir içgörüler sunar. Verileriniz yalnızca okunur ve hiçbir zaman üçüncü taraflarla paylaşılmaz.',
          },
          {
            question: 'Wix blog yazılarımı yönetebilir miyim?',
            answer: 'Evet, VixSEO Wix Headless API sayesinde blog yazılarınızı doğrudan panelden görüntülemenizi ve yönetmenizi sağlar. Başlık, açıklama ve meta etiketlerini Wix editörüne girmeden düzenleyebilirsiniz. Eksik veya hatalı SEO meta verilerini otomatik olarak tespit eder ve iyileştirme önerileri sunar. Toplu düzenleme özelliği ile onlarca yazıyı dakikalar içinde optimize edebilirsiniz.',
          },
          {
            question: 'SEO performansımı nasıl takip edebilirim?',
            answer: 'VixSEO panelindeki Analytics bölümünden sitenizin Google Search Console verilerini detaylı olarak inceleyebilirsiniz. Tıklama, gösterim, CTR ve sıralama trendlerini grafikler üzerinden takip edebilirsiniz. En çok trafik getiren sorgular, en iyi performans gösteren sayfalar ve fırsat kelimeleri gibi raporlara kolayca ulaşabilirsiniz.',
          },
          {
            question: "VixSEO'nun rakiplerden farkı nedir?",
            answer: 'VixSEO, özellikle Wix platformu için optimize edilmiş tek SEO yönetim panelidir. Wix Headless API entegrasyonu sayesinde rakip araçların sunamadığı doğrudan içerik düzenleme imkanı sağlar. Ayrıca Google Search Console verilerini gerçek zamanlı analiz ederek tahmine değil, gerçek veriye dayalı öneriler sunar. Ücretsiz başlangıç planı ile pahalı ajans maliyetlerine alternatif oluşturur.',
          },
          {
            question: 'Verilerim güvende mi?',
            answer: 'Evet, verilerinizin güvenliği en yüksek önceliğimizdir. Tüm veri aktarımları SSL/TLS şifreli bağlantılar üzerinden gerçekleştirilir. Clerk altyapısı ile güvenli kimlik doğrulama ve rol tabanlı erişim kontrolü sağlanır. Google ve Wix entegrasyonları OAuth 2.0 protokolü ile yetkilendirilir ve şifreleriniz hiçbir zaman saklanmaz.',
          },
          {
            question: 'Hangi dilleri destekliyorsunuz?',
            answer: 'VixSEO arayüzü şu anda tamamen Türkçe olarak sunulmaktadır. SEO analiz ve raporlama araçları dil bağımsız çalışır, dolayısıyla herhangi bir dilde içerik barındıran Wix sitenizi analiz edebilirsiniz. Google Search Console verileri sitenizin hedef kitlesine göre tüm dillerde çalışır. İlerleyen dönemlerde İngilizce arayüz desteği de planlanmaktadır.',
          },
          {
            question: 'Mobil cihazlardan erişebilir miyim?',
            answer: 'Evet, VixSEO tamamen responsive tasarıma sahiptir ve mobil cihazlardan sorunsuz şekilde erişilebilir. Tablet ve akıllı telefonlardan panele giriş yaparak SEO verilerinizi takip edebilirsiniz. Tüm grafikler, tablolar ve düzenleme araçları mobil uyumlu olarak tasarlanmıştır. Herhangi bir uygulama indirmenize gerek yoktur, web tarayıcınız üzerinden erişebilirsiniz.',
          },
          {
            question: 'Başlamak için ne yapmalıyım?',
            answer: 'Başlamak için ücretsiz bir hesap oluşturmanız yeterlidir. Kayıt olduktan sonra Wix sitenizi ve Google Search Console hesabınızı panelden bağlayın. İlk senkronizasyon tamamlandığında verileriniz otomatik olarak analiz edilmeye başlanır. Adım adım kurulum kılavuzumuz tüm süreç boyunca size rehberlik eder.',
          },
        ]}
      />
      <FaqSection />
      <CtaSection />
    </>
  )
}
