import { Download, Smartphone, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useInstallPrompt } from "@/hooks/use-install-prompt"

const DISMISS_KEY = "pwa-install-banner-dismissed"

export function PWAInstallBanner() {
  const { canInstall, promptInstall } = useInstallPrompt()
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem(DISMISS_KEY) === "true"
  )

  if (!canInstall || dismissed) return null

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, "true")
    setDismissed(true)
  }

  async function install() {
    const accepted = await promptInstall()
    if (accepted) dismiss()
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100vw-2rem)] max-w-sm rounded-lg border bg-card p-4 shadow-lg animate-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-start gap-3">
        <div className="rounded-md bg-primary/10 p-2 shrink-0">
          <Smartphone className="size-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">Install this app</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Add to your home screen for a faster, offline-capable experience.
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="size-6 shrink-0 -mt-0.5 -mr-1"
          onClick={dismiss}
        >
          <X className="size-3.5" />
        </Button>
      </div>
      <div className="mt-3 flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={dismiss}>
          Not now
        </Button>
        <Button size="sm" onClick={install}>
          <Download className="size-3.5" />
          Install
        </Button>
      </div>
    </div>
  )
}
