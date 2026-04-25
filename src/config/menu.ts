import {
    CircleAlert,
    Files,
    Gauge,
    Layers,
    LucideIcon,
    Smartphone,
} from 'lucide-react'

type MenuItemType = {
    title: string
    url: string
    external?: string
    icon?: LucideIcon
    items?: MenuItemType[]
}
type MenuType = MenuItemType[]

export const mainMenu: MenuType = [
    {
        title: 'nav.pages',
        url: '/pages',
        icon: Files,
        items: [
            {
                title: 'nav.dashboard',
                url: '/',
                icon: Gauge,
            },
            {
                title: 'nav.designSystem',
                url: '/pages/design-system',
                icon: Layers,
            },
            {
                title: 'nav.samplePage',
                url: '/pages/sample',
            },
            {
                title: 'nav.contactForm',
                url: '/pages/contact',
            },
            {
                title: 'nav.comingSoon',
                url: '/pages/feature',
            },
            {
                title: 'nav.pwaStatus',
                url: '/pages/pwa',
                icon: Smartphone,
            },
            {
                title: 'nav.error',
                url: '/404',
                icon: CircleAlert,
            },
        ]
    },
]
