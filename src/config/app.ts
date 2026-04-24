type AppConfigType = {
    name: string,
    github: {
        title: string,
        url: string
    },
    author: {
        name: string,
        url: string
    },
}

export const appConfig: AppConfigType = {
    name: import.meta.env.VITE_APP_NAME ?? "Sample App",
    github: {
        title: "pwa-shadcn-vite-starter",
        url: "https://github.com/ch1nhcp/pwa-shadcn-vite-starter",
    },
    author: {
        name: "ch1nhcp",
        url: "https://github.com/ch1nhcp",
    }
}

export const baseUrl = import.meta.env.VITE_BASE_URL ?? ""
