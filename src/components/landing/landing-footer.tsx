import Link from 'next/link'
import Image from 'next/image'

const footerLinks = {
  Ürün: [
    { label: 'Özellikler', href: '#ozellikler' },
    { label: 'Nasıl Çalışır', href: '#nasil-calisir' },
    { label: 'SSS', href: '#sss' },
  ],
  Kaynaklar: [
    { label: 'Blog', href: '#' },
    { label: 'Dokümantasyon', href: '/docs' },
    { label: 'Destek', href: '/support' },
  ],
  Yasal: [
    { label: 'Gizlilik Politikası', href: '/privacy-policy' },
    { label: 'Kullanım Şartları', href: '/terms-of-use' },
    { label: 'KVKK', href: '/kvkk' },
  ],
}

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Image
              src="/logo.svg"
              alt="VixSEO"
              width={120}
              height={28}
              className="block dark:hidden"
            />
            <Image
              src="/logo-dark.svg"
              alt="VixSEO Logo"
              width={120}
              height={28}
              className="hidden dark:block"
            />
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Wix sitelerinizin SEO performansını profesyonelce yönetmenin en kolay yolu.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-foreground text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} VixSEO. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Twitter
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
