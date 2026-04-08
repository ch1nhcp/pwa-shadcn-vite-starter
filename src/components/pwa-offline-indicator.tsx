import { WifiOff } from "lucide-react"
import { useOnlineStatus } from "@/hooks/use-online-status"

export function PWAOfflineIndicator() {
  const isOnline = useOnlineStatus()

  if (isOnline) return null

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-lg border bg-card px-3 py-2 shadow-lg">
      <WifiOff className="size-4 text-destructive" />
      <span className="text-sm text-muted-foreground">You are offline</span>
    </div>
  )
}
