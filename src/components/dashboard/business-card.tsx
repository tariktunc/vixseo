'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Globe, ExternalLink, ArrowRight } from 'lucide-react'
import type { Business } from '@/types/business'

interface BusinessCardProps {
  business: Business
}

export function BusinessCard({ business }: BusinessCardProps) {
  return (
    <Card className="transition-all hover:shadow-md hover:border-accent/30">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
            <Globe className="h-5 w-5 text-accent" />
          </div>
          <div>
            <CardTitle className="text-base">{business.domain}</CardTitle>
            <p className="text-xs text-muted-foreground">{business.name}</p>
          </div>
        </div>
        <a
          href={`https://${business.domain}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-1.5">
          <Tooltip>
            <TooltipTrigger>
              <Badge variant={business.wixKeyConfigured ? 'default' : 'destructive'} className="text-xs">
                Wix {business.wixKeyConfigured ? '✓' : '✗'}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              {business.wixKeyConfigured
                ? 'Wix API bağlı'
                : 'WIX_SITE_ID eksik — Vercel env\'e ekleyin'}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Badge variant={business.scKeyConfigured ? 'secondary' : 'outline'} className="text-xs">
                SC {business.scKeyConfigured ? '✓' : '✗'}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              {business.scKeyConfigured
                ? 'Search Console bağlı'
                : 'GOOGLE_SERVICE_ACCOUNT_JSON eksik'}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Badge variant={business.adsKeyConfigured ? 'secondary' : 'outline'} className="text-xs">
                Ads {business.adsKeyConfigured ? '✓' : '✗'}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              {business.adsKeyConfigured
                ? 'Google Ads bağlı'
                : 'GOOGLE_ADS_DEVELOPER_TOKEN eksik'}
            </TooltipContent>
          </Tooltip>
        </div>

        <Link href={`/${business.name}`}>
          <Button variant="outline" size="sm" className="w-full">
            Panele Git
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
