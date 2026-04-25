import { appConfig } from '@/config/app'

export function AppFooter() {
    return (
        <footer className="flex items-center min-h-[3rem] md:h-16 py-2">
            <p className="text-sm leading-loose text-muted-foreground">
                Built by <a href={appConfig.author.url} target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">{appConfig.author.name}</a>.
                The source code is available on <a href={appConfig.github.url} target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">GitHub</a>.
            </p>
        </footer>
    )
}