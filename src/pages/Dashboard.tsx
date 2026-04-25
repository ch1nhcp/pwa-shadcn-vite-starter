import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import {
  Box,
  ExternalLink,
  Github,
  Globe,
  Languages,
  Layers,
  Moon,
  Package,
  RefreshCw,
  Shield,
  Smartphone,
  Zap,
} from "lucide-react"
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { appConfig } from "@/config/app"
import { usePostStore } from "@/stores/use-post-store"

const TECH_STACK = [
  { name: "React 19", desc: "UI library", color: "bg-[#58C4DC]/10 text-[#058EA7] border-[#58C4DC]/30" },
  { name: "Vite 6", desc: "Build tool", color: "bg-[#BD34FE]/10 text-[#9333EA] border-[#BD34FE]/30" },
  { name: "TypeScript", desc: "Type safety", color: "bg-[#3178C6]/10 text-[#3178C6] border-[#3178C6]/30" },
  { name: "Tailwind v4", desc: "Styling", color: "bg-[#06B6D4]/10 text-[#0891B2] border-[#06B6D4]/30" },
  { name: "shadcn/ui", desc: "Components", color: "bg-foreground/5 text-foreground border-border" },
  { name: "Zustand", desc: "State", color: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30" },
  { name: "React Router v7", desc: "Routing", color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30" },
  { name: "Vite PWA", desc: "Offline", color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30" },
  { name: "react-i18next", desc: "i18n", color: "bg-[#1863dc]/10 text-[#1863dc] border-[#1863dc]/30" },
  { name: "React Hook Form", desc: "Forms", color: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30" },
  { name: "Zod", desc: "Validation", color: "bg-[#9b60aa]/10 text-[#9b60aa] border-[#9b60aa]/30" },
]

const FEATURE_ICONS = {
  pwa: Smartphone,
  theme: Moon,
  i18n: Languages,
  design: Layers,
  state: Zap,
  forms: Box,
  router: Globe,
  types: Shield,
}

export default function Dashboard() {
  const { posts, loading, error, fetchPosts, clearPosts } = usePostStore()
  const { t } = useTranslation()

  useEffect(() => {
    if (posts.length === 0 && !loading && !error) {
      fetchPosts()
    }
  }, [posts.length, loading, error, fetchPosts])

  const features = t('dashboard.features', { returnObjects: true }) as Record<string, { title: string; desc: string }>

  return (
    <>
      <PageHeader>
        <div className="flex items-center gap-2 mb-2">
          <Package className="size-5 text-muted-foreground" />
          <span className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
            {appConfig.github.title}
          </span>
        </div>
        <PageHeaderHeading>{t('dashboard.hero.heading')}</PageHeaderHeading>
        <PageHeaderDescription className="max-w-2xl">
          {t('dashboard.hero.subheading')}
        </PageHeaderDescription>
        <div className="mt-4 flex gap-3">
          <Button asChild size="sm">
            <a href={appConfig.github.url} target="_blank" rel="noreferrer">
              <Github className="size-3.5" />
              {t('dashboard.hero.viewOnGithub')}
            </a>
          </Button>
          <Button asChild variant="outline" size="sm">
            <a href="/pages/design-system">
              <Layers className="size-3.5" />
              {t('dashboard.hero.viewDesignSystem')}
            </a>
          </Button>
        </div>
      </PageHeader>

      {/* Tech Stack */}
      <section>
        <p className="text-xs tracking-widest uppercase font-mono text-muted-foreground mb-3">
          {t('dashboard.techStack.label')}
        </p>
        <div className="flex flex-wrap gap-2">
          {TECH_STACK.map((tech) => (
            <div
              key={tech.name}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${tech.color}`}
            >
              {tech.name}
              <span className="opacity-60">·</span>
              <span className="opacity-60 font-normal">{tech.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      {/* Features */}
      <section>
        <p className="text-xs tracking-widest uppercase font-mono text-muted-foreground mb-3">
          {t('dashboard.featuresLabel')}
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(features).map(([key, feature]) => {
            const Icon = FEATURE_ICONS[key as keyof typeof FEATURE_ICONS] ?? Box
            return (
              <Card key={key} className="border-border/60">
                <CardHeader className="pb-2 pt-4 px-4">
                  <div className="mb-2 flex size-7 items-center justify-center rounded-lg bg-foreground/5">
                    <Icon className="size-3.5 text-foreground" />
                  </div>
                  <CardTitle className="text-sm">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <CardDescription className="text-xs leading-relaxed">{feature.desc}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <Separator className="my-8" />

      {/* Zustand posts demo */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs tracking-widest uppercase font-mono text-muted-foreground mb-0.5">
              {t('dashboard.demo.label')}
            </p>
            <h2 className="text-base font-medium">{t('dashboard.demo.title')}</h2>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={fetchPosts} disabled={loading}>
              <RefreshCw className="size-3.5" />
              {t('dashboard.refresh')}
            </Button>
            <Button variant="ghost" size="sm" onClick={clearPosts} disabled={loading}>
              {t('dashboard.clear')}
            </Button>
          </div>
        </div>

        {error && (
          <Card className="mb-4 border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive text-sm">{t('dashboard.error')}</CardTitle>
              <CardDescription>{error}</CardDescription>
            </CardHeader>
          </Card>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="mt-2 h-3 w-full" />
                    <Skeleton className="mt-1 h-3 w-2/3" />
                  </CardHeader>
                </Card>
              ))
            : posts.slice(0, 6).map((post) => (
                <Card key={post.id} className="group">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-sm leading-snug">{post.title}</CardTitle>
                      <Badge variant="secondary" className="shrink-0 text-xs tabular-nums">
                        #{post.id}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2 text-xs">{post.body}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
        </div>

        {!loading && posts.length > 6 && (
          <p className="mt-3 text-center text-xs text-muted-foreground">
            {t('dashboard.demo.andMore', { count: posts.length - 6 })}
          </p>
        )}
      </section>

      {/* Footer CTA */}
      <div className="mt-12 rounded-[22px] border border-border bg-muted/30 px-8 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="font-medium">{t('dashboard.cta.title')}</p>
          <p className="text-sm text-muted-foreground mt-0.5">{t('dashboard.cta.desc')}</p>
        </div>
        <Button asChild variant="outline" size="sm" className="shrink-0">
          <a href={appConfig.github.url} target="_blank" rel="noreferrer">
            <ExternalLink className="size-3.5" />
            {t('dashboard.cta.action')}
          </a>
        </Button>
      </div>
    </>
  )
}
