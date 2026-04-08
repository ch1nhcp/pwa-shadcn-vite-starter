import { BrowserRouter, HashRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { PWAUpdatePrompt } from './components/pwa-update-prompt'
import { PWAOfflineIndicator } from './components/pwa-offline-indicator'
import Router from './Router'

const AppRouter = import.meta.env.VITE_USE_HASH_ROUTE === 'true' ? HashRouter : BrowserRouter

export default function App() {
    return (
        <ThemeProvider>
            <AppRouter>
                <Router />
            </AppRouter>
            <PWAUpdatePrompt />
            <PWAOfflineIndicator />
        </ThemeProvider>
    )
}
