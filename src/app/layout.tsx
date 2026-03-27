import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import Script from 'next/script'
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'VixSEO — SEO Yönetim Paneli',
  description: 'Wix sitelerinizi tek panelden yönetin',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html
        lang="tr"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        suppressHydrationWarning
      >
        <body className="min-h-full flex flex-col" suppressHydrationWarning>
          <Providers>
            <main className="flex-1">{children}</main>
            <Toaster />
          </Providers>
          <Script
            id="blakfy-footer"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
(function() {
  if (document.getElementById('blakfy-footer-el')) return;
  var footer = document.createElement("div");
  footer.id = "blakfy-footer-el";
  var year = new Date().getFullYear();
  var language = navigator.language || navigator.languages[0];
  var domain = window.location.hostname.replace(/^www\\./, '');
  var homeUrl = "https://" + domain;
  var content;
  if (language.startsWith("en")) {
    content = "© " + year + " <a href='" + homeUrl + "' style='color:inherit;text-decoration:none;'>" + domain + "</a>. All Rights Reserved. This site was created by <a href='https://blakfy.com' target='_blank' style='color:inherit;text-decoration:none;'>Blakfy</a>.";
  } else if (language.startsWith("de")) {
    content = "© " + year + " <a href='" + homeUrl + "' style='color:inherit;text-decoration:none;'>" + domain + "</a>. Alle Rechte vorbehalten. Diese Website wurde von <a href='https://blakfy.com' target='_blank' style='color:inherit;text-decoration:none;'>Blakfy</a> erstellt.";
  } else if (language.startsWith("fr")) {
    content = "© " + year + " <a href='" + homeUrl + "' style='color:inherit;text-decoration:none;'>" + domain + "</a>. Tous droits réservés. Ce site a été créé par <a href='https://blakfy.com' target='_blank' style='color:inherit;text-decoration:none;'>Blakfy</a>.";
  } else {
    content = "© " + year + " <a href='" + homeUrl + "' style='color:inherit;text-decoration:none;'>" + domain + "</a>. Tüm Hakları Saklıdır. Bu site <a href='https://blakfy.com' target='_blank' style='color:inherit;text-decoration:none;'>Blakfy</a> tarafından oluşturuldu.";
  }
  footer.innerHTML = content;
  footer.style.textAlign = "center";
  footer.style.padding = "10px";
  footer.style.color = "#666";
  footer.style.fontSize = "14px";
  if (window.innerWidth <= 768) { footer.style.fontSize = "10px"; }
  document.body.appendChild(footer);
})();
              `,
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  )
}
