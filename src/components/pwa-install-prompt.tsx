import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useInstallPrompt } from "@/hooks/use-install-prompt"

export function PWAInstallButton() {
  const { canInstall, promptInstall } = useInstallPrompt()

  if (!canInstall) return null

  return (
    <Button variant="outline" size="sm" onClick={promptInstall}>
      <Download className="size-3.5" />
      Install App
    </Button>
  )
}
