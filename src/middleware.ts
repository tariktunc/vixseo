import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { type Role, ROLE_HIERARCHY } from '@/types/auth'

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
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

function getRole(sessionClaims: any): Role {
  return sessionClaims?.metadata?.role || 'viewer'
}

function hasMinRole(role: Role, minRole: Role): boolean {
  return ROLE_HIERARCHY[role] >= ROLE_HIERARCHY[minRole]
}

export default clerkMiddleware(async (auth, request) => {
  // Public route'lar herkese açık
  if (isPublicRoute(request)) return

  // Giriş yapılmamışsa → sign-in'e yönlendir
  const session = await auth()

  if (!session.userId) {
    return session.redirectToSignIn()
  }

  const role = getRole(session.sessionClaims)

  // API route'ları → endpoint bazlı kontrol auth.ts'de yapılacak, temel auth yeterli
  if (isApiRoute(request)) {
    return
  }

  // Admin-only sayfalar (settings, users)
  if (isAdminPage(request)) {
    if (!hasMinRole(role, 'admin')) {
      return Response.redirect(new URL('/', request.url))
    }
    return
  }

  // Editor+ sayfalar (keywords, sitemap, redirects)
  if (isEditorPage(request)) {
    if (!hasMinRole(role, 'editor')) {
      return Response.redirect(new URL('/', request.url))
    }
    return
  }

  // Business sayfaları — viewer business kontrolü
  const pathname = new URL(request.url).pathname
  const businessMatch = pathname.match(/^\/([a-z0-9-]+)/)
  if (businessMatch && role === 'viewer') {
    const businessName = businessMatch[1]
    const businessIds = (session.sessionClaims as any)?.metadata?.businessIds as string[] | undefined
    if (businessIds && !businessIds.includes(businessName)) {
      return Response.redirect(new URL('/', request.url))
    }
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
