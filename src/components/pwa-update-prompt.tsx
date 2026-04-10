import { RefreshCw, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePWA } from "@/hooks/use-pwa"

export function PWAUpdatePrompt() {
  const { needRefresh, offlineReady, updateServiceWorker, close } = usePWA()

  if (!needRefresh && !offlineReady) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm rounded-lg border bg-card p-4 shadow-lg">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="text-sm font-medium">
            {needRefresh
              ? "New version available"
              : "App ready for offline use"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {needRefresh
              ? "Click reload to update to the latest version."
              : "Content has been cached for offline use."}
          </p>
        </div>
        <Button variant="ghost" size="icon" className="size-7" onClick={close}>
          <X className="size-4" />
        </Button>
      </div>
      {needRefresh && (
        <div className="mt-3 flex justify-end">
          <Button size="sm" onClick={() => updateServiceWorker(true)}>
            <RefreshCw className="size-3.5" />
            Reload
          </Button>
        </div>
      )}
    </div>
  )
}
