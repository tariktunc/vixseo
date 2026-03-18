import type { Role } from './auth'

export {}

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Role
      businessIds?: string[]
    }
  }
}
