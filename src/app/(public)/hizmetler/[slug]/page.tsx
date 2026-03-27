import { notFound } from 'next/navigation'
import { getAllServices, getServiceBySlug, getRelatedServices } from '@/lib/services-data'
import { ServiceDetailContent } from '@/components/services/service-detail-content'

// ---------------------------------------------------------------------------
// SSG
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return getAllServices().map((service) => ({ slug: service.slug }))
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const service = getServiceBySlug(slug)
  if (!service) return { title: 'Hizmet Bulunamadı — VixSEO' }

  return {
    title: `${service.shortTitle} — VixSEO Hizmetleri`,
    description: service.shortDescription,
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function ServiceDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const service = getServiceBySlug(slug)
  if (!service) return notFound()

  const allServices = getAllServices()
  const relatedServices = getRelatedServices(slug)

  const currentIndex = allServices.findIndex((s) => s.slug === slug)
  const prevService = currentIndex > 0 ? allServices[currentIndex - 1] : null
  const nextService = currentIndex < allServices.length - 1 ? allServices[currentIndex + 1] : null

  return (
    <ServiceDetailContent
      service={service}
      relatedServices={relatedServices}
      prevService={prevService}
      nextService={nextService}
    />
  )
}
