import { useRegisterSW } from "virtual:pwa-register/react"

export function usePWA() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, registration) {
      console.log(`Service Worker registered: ${swUrl}`)

      // Check for updates every hour
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

  function close() {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  return {
    needRefresh,
    offlineReady,
    updateServiceWorker,
    close,
  }
}
