import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Download, RefreshCw, Shield, Smartphone, Wifi, WifiOff, Zap } from "lucide-react"
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { usePWA } from "@/hooks/use-pwa"
import { useInstallPrompt } from "@/hooks/use-install-prompt"
import { useOnlineStatus } from "@/hooks/use-online-status"

type CacheInfo = { name: string; count: number }

function useCacheInfo() {
  const [caches, setCaches] = useState<CacheInfo[]>([])

  async function refresh() {
    if (!("caches" in window)) return
    try {
      const keys = await window.caches.keys()
      const info = await Promise.all(
        keys.map(async (name) => {
          const cache = await window.caches.open(name)
          const requests = await cache.keys()
          return { name, count: requests.length }
        })
      )
      setCaches(info)
    } catch {
      setCaches([])
    }
  }

  useEffect(() => { refresh() }, [])

  return { caches, refresh }
}

function StatusBadge({ ok, label }: { ok: boolean; label: string }) {
  return (
    <Badge variant={ok ? "default" : "secondary"} className="text-xs">
      {label}
    </Badge>
  )
}

export default function PWAStatus() {
  const { needRefresh, offlineReady, updateServiceWorker, close } = usePWA()
  const { canInstall, isInstalled, promptInstall } = useInstallPrompt()
  const isOnline = useOnlineStatus()
  const { caches, refresh: refreshCaches } = useCacheInfo()
  const { t } = useTranslation()

  const swSupported = "serviceWorker" in navigator
  const totalCached = caches.reduce((sum, c) => sum + c.count, 0)

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>{t('pwa.title')}</PageHeaderHeading>
        <PageHeaderDescription>
          {t('pwa.description')}
        </PageHeaderDescription>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Network */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t('pwa.network')}</CardTitle>
              {isOnline
                ? <Wifi className="size-4 text-green-500" />
                : <WifiOff className="size-4 text-destructive" />}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{isOnline ? t('pwa.online') : t('pwa.offline')}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {isOnline ? t('pwa.onlineDesc') : t('pwa.offlineDesc')}
            </p>
          </CardContent>
        </Card>

        {/* Service Worker */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t('pwa.serviceWorker')}</CardTitle>
              <Shield className="size-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {!swSupported ? t('pwa.unsupported') : offlineReady ? t('pwa.active') : t('pwa.registering')}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <StatusBadge ok={swSupported} label={swSupported ? t('pwa.supported') : t('pwa.noSW')} />
              <StatusBadge ok={offlineReady} label={offlineReady ? t('pwa.offlineReady') : t('pwa.notCached')} />
              {needRefresh && (
                <Badge variant="outline" className="text-xs border-amber-400 text-amber-600">
                  {t('pwa.updatePending')}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Install */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t('pwa.installation')}</CardTitle>
              <Smartphone className="size-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {isInstalled ? t('pwa.installed') : canInstall ? t('pwa.available') : t('pwa.notAvailable')}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {isInstalled
                ? t('pwa.installedDesc')
                : canInstall
                  ? t('pwa.canInstallDesc')
                  : t('pwa.notAvailableDesc')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Cache breakdown */}
      <Card className="mt-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Zap className="size-4" />
                {t('pwa.cacheStorage')}
              </CardTitle>
              <CardDescription>
                {t('pwa.resource_other', { count: totalCached, caches: caches.length })}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={refreshCaches}>
              <RefreshCw className="size-3.5" />
              {t('pwa.refresh')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {caches.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {swSupported ? t('pwa.noCaches') : t('pwa.cacheApiUnsupported')}
            </p>
          ) : (
            <div className="divide-y">
              {caches.map((c) => (
                <div key={c.name} className="flex items-center justify-between py-2.5">
                  <span className="text-sm font-mono text-muted-foreground truncate pr-4">{c.name}</span>
                  <Badge variant="secondary" className="shrink-0">
                    {t('pwa.item_other', { count: c.count })}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      {(needRefresh || canInstall) && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>{t('pwa.actions')}</CardTitle>
            <CardDescription>{t('pwa.actionsDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            {needRefresh && (
              <Button onClick={() => updateServiceWorker(true)}>
                <RefreshCw className="size-4" />
                {t('pwa.applyUpdate')}
              </Button>
            )}
            {needRefresh && (
              <Button variant="ghost" onClick={close}>
                {t('pwa.dismissUpdate')}
              </Button>
            )}
            {canInstall && (
              <Button variant="outline" onClick={promptInstall}>
                <Download className="size-4" />
                {t('pwa.installApp')}
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </>
  )
}
