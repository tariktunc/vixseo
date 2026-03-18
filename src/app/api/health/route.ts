import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    env: {
      wixApiKey: !!process.env.WIX_API_KEY,
      database: !!process.env.DATABASE_URL,
      clerk: !!process.env.CLERK_SECRET_KEY,
      googleSc: !!process.env.GOOGLE_SERVICE_ACCOUNT_JSON,
      googleAds: !!process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
    },
  })
}
