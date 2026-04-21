import { Routes, Route } from 'react-router-dom'
import { AppLayout } from './components/app-layout'
import NotMatch from './pages/NotMatch'
import Dashboard from './pages/Dashboard'
import Sample from './pages/Sample'
import ComingSoon from './pages/ComingSoon'
import ContactForm from './pages/ContactForm'
import PWAStatus from './pages/PWAStatus'

export default function Router() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="" element={<Dashboard />} />
                <Route path="pages">
                    <Route path="sample" element={<Sample />} />
                    <Route path="contact" element={<ContactForm />} />
                    <Route path="feature" element={<ComingSoon />} />
                    <Route path="pwa" element={<PWAStatus />} />
                </Route>
                <Route path="*" element={<NotMatch />} />
            </Route>
        </Routes>
    )
}
