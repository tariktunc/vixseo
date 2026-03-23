import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { type Role, ROLE_HIERARCHY } from '@/types/auth'

const isPublicRoute = createRouteMatcher([
  '/',
  '/features(.*)',
  '/how-it-works(.*)',
  '/faq(.*)',
  '/pricing(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/docs(.*)',
  '/support(.*)',
  '/privacy-policy(.*)',
  '/terms-of-use(.*)',
  '/kvkk(.*)',
  '/blog(.*)',
  '/api/health(.*)',
])

const isApiRoute = createRouteMatcher(['/api/(.*)'])

// Admin-only sayfalar
const isAdminPage = createRouteMatcher([
  '/settings(.*)',
])

// Editor+ sayfalar (keywords, sitemap, redirects)
const isEditorPage = createRouteMatcher([
  '/:business/keywords(.*)',
  '/:business/sitemap(.*)',
  '/:business/redirects(.*)',
])

function hasMinRole(role: Role, minRole: Role): boolean {
  return ROLE_HIERARCHY[role] >= ROLE_HIERARCHY[minRole]
}

export default clerkMiddleware(async (auth, request) => {
  // Public route'lar herkese açık
  if (isPublicRoute(request)) {
    // Giriş yapmış kullanıcı ana sayfaya gelirse dashboard'a yönlendir
    const session = await auth()
    if (session.userId && request.nextUrl.pathname === '/') {
      return Response.redirect(new URL('/dashboard', request.url))
    }
    return
  }

  // Giriş yapılmamışsa → sign-in'e yönlendir
  const session = await auth()

  if (!session.userId) {
    return session.redirectToSignIn()
  }

  // API route'ları → endpoint bazlı kontrol auth.ts'de yapılacak, temel auth yeterli
  if (isApiRoute(request)) {
    return
  }

  // Sayfa route'ları için claims'den rol oku (proxy için yeterli, API'lerde fresh kontrol devam eder)
  const role = (session.sessionClaims?.publicMetadata as { role?: string })?.role as Role || 'viewer'

  // Admin-only sayfalar (settings, users)
  if (isAdminPage(request)) {
    if (!hasMinRole(role, 'admin')) {
      return Response.redirect(new URL('/dashboard', request.url))
    }
    return
  }

  // Editor+ sayfalar (keywords, sitemap, redirects)
  if (isEditorPage(request)) {
    if (!hasMinRole(role, 'editor')) {
      return Response.redirect(new URL('/dashboard', request.url))
    }
    return
  }

  // Business sayfaları — viewer business kontrolü
  const pathname = new URL(request.url).pathname
  const businessMatch = pathname.match(/^\/([a-z0-9-]+)/)
  if (businessMatch && role === 'viewer') {
    const businessIds = (session.sessionClaims?.publicMetadata as { businessIds?: string[] })?.businessIds
    if (businessIds && !businessIds.includes(businessMatch[1])) {
      return Response.redirect(new URL('/dashboard', request.url))
    }
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
