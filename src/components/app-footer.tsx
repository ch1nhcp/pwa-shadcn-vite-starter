import { useTranslation } from 'react-i18next'
import { appConfig } from '@/config/app'

export function AppFooter() {
    const { t } = useTranslation()

    return (
        <footer className="flex items-center min-h-[3rem] md:h-16 py-2">
            <p className="text-sm leading-loose text-muted-foreground">
                {t('footer.builtBy')}{' '}
                <a href={appConfig.author.url} target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
                    {appConfig.author.name}
                </a>.
            </p>
        </footer>
    )
}
