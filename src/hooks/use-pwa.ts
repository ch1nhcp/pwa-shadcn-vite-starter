import { useCallback } from "react"
import { useRegisterSW } from "virtual:pwa-register/react"

export type SWStatus = "installing" | "waiting" | "active" | "unknown"

export function usePWA() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_swUrl, registration) {
      if (registration) {
        setInterval(() => {
          registration.update()
        }, 60 * 60 * 1000)
      }
    },
    onRegisterError(error) {
      console.error("Service Worker registration error:", error)
    },
  })

  const close = useCallback(() => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }, [setOfflineReady, setNeedRefresh])

  return {
    needRefresh,
    offlineReady,
    updateServiceWorker,
    close,
  }
}
