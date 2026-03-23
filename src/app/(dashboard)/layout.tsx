import { LandingNavbar } from '@/components/landing/landing-navbar'
import { LandingFooter } from '@/components/landing/landing-footer'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />
      <main className="flex-1 pt-28 pb-20 bg-slate-50 dark:bg-slate-900">{children}</main>
      <div className="mt-auto">
        <LandingFooter />
      </div>
    </div>
  )
}
