/**
 * Varsayılan işletmeler — seed ve auto-seed tarafından kullanılır
 */
export const DEFAULT_BUSINESSES = [
  {
    name: 'blakfy',
    domain: 'blakfy.com',
    siteId: '7a2f84ce-61de-4785-b61d-e81718514e0a',
    memberId: '4efb86b2-aee1-4927-ab61-48cb8c35f128',
    language: 'tr',
    searchConsoleUrl: 'https://www.blakfy.com/',
  },
  {
    name: 'ibrahiminyeri',
    domain: 'ibrahiminyeri.com',
    siteId: 'a471328e-719b-4aad-b0bb-dd3e5f4f3015',
    memberId: '51894242-999d-442a-a76b-7848dc97388e',
    language: 'tr',
    searchConsoleUrl: 'https://www.ibrahiminyeri.com/',
  },
] as const
