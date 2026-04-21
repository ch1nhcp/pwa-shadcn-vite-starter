import { RefreshCw, X, CheckCircle } from "lucide-react"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { usePWA } from "@/hooks/use-pwa"

export function PWAUpdatePrompt() {
  const { needRefresh, offlineReady, updateServiceWorker, close } = usePWA()

  useEffect(() => {
    if (offlineReady && !needRefresh) {
      const timer = setTimeout(close, 4000)
      return () => clearTimeout(timer)
    }
  }, [offlineReady, needRefresh, close])

  if (!needRefresh && !offlineReady) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 rounded-lg border bg-card p-4 shadow-lg animate-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">
          {needRefresh ? (
            <RefreshCw className="size-4 text-primary" />
          ) : (
            <CheckCircle className="size-4 text-green-500" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">
            {needRefresh ? "Update available" : "Ready for offline use"}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {needRefresh
              ? "A new version is ready. Reload to apply the update."
              : "The app is fully cached and works without internet."}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="size-6 shrink-0 -mt-0.5 -mr-1"
          onClick={close}
        >
          <X className="size-3.5" />
        </Button>
      </div>
      {needRefresh && (
        <div className="mt-3 flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={close}>
            Later
          </Button>
          <Button size="sm" onClick={() => updateServiceWorker(true)}>
            <RefreshCw className="size-3.5" />
            Reload
          </Button>
        </div>
      )}
    </div>
  )
}
