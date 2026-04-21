import { useEffect, useState } from "react"
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

  const swSupported = "serviceWorker" in navigator
  const totalCached = caches.reduce((sum, c) => sum + c.count, 0)

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>PWA Status</PageHeaderHeading>
        <PageHeaderDescription>
          Service worker, caching, and install state for this app.
        </PageHeaderDescription>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Network */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Network</CardTitle>
              {isOnline
                ? <Wifi className="size-4 text-green-500" />
                : <WifiOff className="size-4 text-destructive" />}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{isOnline ? "Online" : "Offline"}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {isOnline
                ? "Connected — live data will be fetched."
                : "No connection — cached data is served."}
            </p>
          </CardContent>
        </Card>

        {/* Service Worker */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Service Worker</CardTitle>
              <Shield className="size-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {!swSupported ? "Unsupported" : offlineReady ? "Active" : "Registering"}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <StatusBadge ok={swSupported} label={swSupported ? "Supported" : "No SW"} />
              <StatusBadge ok={offlineReady} label={offlineReady ? "Offline ready" : "Not cached"} />
              {needRefresh && (
                <Badge variant="outline" className="text-xs border-amber-400 text-amber-600">
                  Update pending
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Install */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Installation</CardTitle>
              <Smartphone className="size-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {isInstalled ? "Installed" : canInstall ? "Available" : "Not available"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {isInstalled
                ? "Running as a standalone app."
                : canInstall
                  ? "Can be installed to your device."
                  : "Install not available in this browser/context."}
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
                Cache Storage
              </CardTitle>
              <CardDescription>
                {totalCached} resource{totalCached !== 1 ? "s" : ""} cached across {caches.length} cache{caches.length !== 1 ? "s" : ""}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={refreshCaches}>
              <RefreshCw className="size-3.5" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {caches.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {swSupported ? "No caches found. Build and serve in production mode to populate caches." : "Cache API not supported in this browser."}
            </p>
          ) : (
            <div className="divide-y">
              {caches.map((c) => (
                <div key={c.name} className="flex items-center justify-between py-2.5">
                  <span className="text-sm font-mono text-muted-foreground truncate pr-4">{c.name}</span>
                  <Badge variant="secondary" className="shrink-0">{c.count} item{c.count !== 1 ? "s" : ""}</Badge>
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
            <CardTitle>Actions</CardTitle>
            <CardDescription>Available actions based on current PWA state.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            {needRefresh && (
              <Button onClick={() => updateServiceWorker(true)}>
                <RefreshCw className="size-4" />
                Apply update &amp; reload
              </Button>
            )}
            {needRefresh && (
              <Button variant="ghost" onClick={close}>
                Dismiss update
              </Button>
            )}
            {canInstall && (
              <Button variant="outline" onClick={promptInstall}>
                <Download className="size-4" />
                Install app
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </>
  )
}
