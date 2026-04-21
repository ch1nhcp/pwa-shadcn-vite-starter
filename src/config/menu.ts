import {
    CircleAlert,
    Files,
    Gauge,
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
        title: 'Dashboard',
        url: '/',
        icon: Gauge
    },
    {
        title: 'Pages',
        url: '/pages',
        icon: Files,
        items: [
            {
                title: 'Sample Page',
                url: '/pages/sample',
            },
            {
                title: 'Contact Form',
                url: '/pages/contact',
            },
            {
                title: 'Coming Soon',
                url: '/pages/feature',
            },
        ]
    },
    {
        title: 'PWA Status',
        url: '/pages/pwa',
        icon: Smartphone,
    },
    {
        title: 'Error',
        url: '/404',
        icon: CircleAlert,
    },
]
