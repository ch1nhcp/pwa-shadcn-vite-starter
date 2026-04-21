import { Wifi, WifiOff } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useOnlineStatus } from "@/hooks/use-online-status"
import { cn } from "@/lib/utils"

export function PWAOfflineIndicator() {
  const isOnline = useOnlineStatus()
  const prevOnlineRef = useRef(isOnline)
  const [showReconnected, setShowReconnected] = useState(false)

  useEffect(() => {
    if (!prevOnlineRef.current && isOnline) {
      setShowReconnected(true)
      const timer = setTimeout(() => setShowReconnected(false), 3000)
      prevOnlineRef.current = true
      return () => clearTimeout(timer)
    }
    prevOnlineRef.current = isOnline
  }, [isOnline])

  if (isOnline && !showReconnected) return null

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-lg border px-3 py-2 shadow-lg animate-in slide-in-from-bottom-4 duration-300",
        isOnline
          ? "bg-green-50 border-green-200 dark:bg-green-950/50 dark:border-green-800"
          : "bg-card"
      )}
    >
      {isOnline ? (
        <>
          <Wifi className="size-4 text-green-600 dark:text-green-400" />
          <span className="text-sm font-medium text-green-700 dark:text-green-300">
            Back online
          </span>
        </>
      ) : (
        <>
          <WifiOff className="size-4 text-destructive" />
          <span className="text-sm text-muted-foreground">You are offline</span>
        </>
      )}
    </div>
  )
}
