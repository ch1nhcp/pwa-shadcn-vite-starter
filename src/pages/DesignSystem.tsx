import { useTranslation } from 'react-i18next'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { PageHeader, PageHeaderHeading } from '@/components/page-header'
import { useActiveSection } from '@/hooks/use-active-section'

const SECTION_IDS = ['colors', 'typography', 'buttons', 'cards', 'forms', 'feedback'] as const

const PALETTE = [
  { name: 'Cohere Black', hex: '#000000', bg: 'bg-black' },
  { name: 'Near Black', hex: '#212121', bg: 'bg-[#212121]' },
  { name: 'Interaction Blue', hex: '#1863dc', bg: 'bg-[#1863dc]' },
  { name: 'Focus Purple', hex: '#9b60aa', bg: 'bg-[#9b60aa]' },
  { name: 'Muted Slate', hex: '#93939f', bg: 'bg-[#93939f]' },
  { name: 'Border Cool', hex: '#d9d9dd', bg: 'bg-[#d9d9dd]' },
  { name: 'Lightest Gray', hex: '#f2f2f2', bg: 'bg-[#f2f2f2]' },
  { name: 'Snow', hex: '#fafafa', bg: 'bg-[#fafafa]' },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs tracking-widest uppercase text-muted-foreground font-mono mb-2">
      {children}
    </p>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mb-6 font-light tracking-tight text-foreground"
      style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '-0.04rem' }}
    >
      {children}
    </h2>
  )
}

export default function DesignSystem() {
  const activeId = useActiveSection(SECTION_IDS as unknown as string[])
  const { t } = useTranslation()

  const sections = SECTION_IDS.map((id) => ({
    id,
    label: t(`designSystem.sections.${id}`),
  }))

  return (
    <TooltipProvider>
      <PageHeader>
        <PageHeaderHeading
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '3rem',
            fontWeight: 300,
            letterSpacing: '-0.96px',
            lineHeight: 1,
          }}
        >
          {t('designSystem.title')}
        </PageHeaderHeading>
        <p className="text-sm text-muted-foreground mt-2">
          {t('designSystem.subtitle')}
        </p>
      </PageHeader>

      <div className="flex gap-8">
        {/* Sticky section nav */}
        <aside className="hidden lg:block w-40 flex-shrink-0">
          <div className="sticky top-4">
            <p className="text-xs tracking-widest uppercase text-muted-foreground font-mono mb-3">
              {t('designSystem.onThisPage')}
            </p>
            <nav className="flex flex-col gap-1">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`text-sm py-1 transition-colors hover:text-[#1863dc] ${
                    activeId === s.id
                      ? 'font-medium text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Page content */}
        <div className="flex-1 min-w-0 space-y-12 pb-16">

          {/* 01 — Colors */}
          <section id="colors">
            <SectionLabel>01 — {t('designSystem.sections.colors')}</SectionLabel>
            <SectionTitle>{t('designSystem.palette')}</SectionTitle>
            <div className="flex flex-wrap gap-3">
              {PALETTE.map((swatch) => (
                <div key={swatch.hex} className="w-20">
                  <div
                    className={`h-10 rounded-xl border border-border ${swatch.bg}`}
                  />
                  <p className="text-xs font-medium mt-1.5 text-foreground">{swatch.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{swatch.hex}</p>
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* 02 — Typography */}
          <section id="typography">
            <SectionLabel>02 — {t('designSystem.sections.typography')}</SectionLabel>
            <SectionTitle>{t('designSystem.typeScale')}</SectionTitle>
            <div className="space-y-5">
              <div className="flex items-baseline gap-6">
                <span className="text-xs font-mono text-muted-foreground w-36 flex-shrink-0">
                  Display / 72px
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                    fontWeight: 300,
                    letterSpacing: '-0.09rem',
                    lineHeight: 1,
                  }}
                >
                  Enterprise AI
                </span>
              </div>
              <div className="flex items-baseline gap-6">
                <span className="text-xs font-mono text-muted-foreground w-36 flex-shrink-0">
                  Sub-heading / 32px
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    fontWeight: 400,
                    letterSpacing: '-0.032rem',
                  }}
                >
                  Feature Title
                </span>
              </div>
              <div className="flex items-baseline gap-6">
                <span className="text-xs font-mono text-muted-foreground w-36 flex-shrink-0">
                  Body Large / 18px
                </span>
                <span className="text-lg">
                  Intro paragraph text for sections and descriptions.
                </span>
              </div>
              <div className="flex items-baseline gap-6">
                <span className="text-xs font-mono text-muted-foreground w-36 flex-shrink-0">
                  Caption / 14px
                </span>
                <span className="text-sm text-muted-foreground">
                  Metadata, descriptions, and helper text
                </span>
              </div>
              <div className="flex items-baseline gap-6">
                <span className="text-xs font-mono text-muted-foreground w-36 flex-shrink-0">
                  Uppercase Label
                </span>
                <span className="text-xs tracking-widest uppercase font-mono text-muted-foreground">
                  Section Label · CohereMono style
                </span>
              </div>
            </div>
          </section>

          <Separator />

          {/* 03 — Buttons */}
          <section id="buttons">
            <SectionLabel>03 — {t('designSystem.sections.buttons')}</SectionLabel>
            <SectionTitle>{t('designSystem.variantsSizes')}</SectionTitle>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Variants</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="default">Dark Solid</Button>
                  <Button variant="outline">Outlined</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Sizes</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Ghost is transparent by default · text shifts to{' '}
                <code className="font-mono">#1863dc</code> on hover
              </p>
            </div>
          </section>

          <Separator />

          {/* 04 — Cards & Containers */}
          <section id="cards">
            <SectionLabel>04 — {t('designSystem.sections.cards')}</SectionLabel>
            <SectionTitle>{t('designSystem.radiusSystem')}</SectionTitle>
            <div className="flex flex-wrap gap-4 mb-6">
              <Card className="w-52 rounded-[22px]">
                <CardHeader>
                  <CardTitle className="text-base">Standard Card</CardTitle>
                  <CardDescription>1px solid border · 22px radius</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Default border-border surface</p>
                </CardContent>
              </Card>
              <Card className="w-52 rounded-[22px] border-[#d9d9dd]">
                <CardHeader>
                  <CardTitle className="text-base">Emphasized</CardTitle>
                  <CardDescription>Border Cool (#d9d9dd)</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Higher-contrast containment</p>
                </CardContent>
              </Card>
            </div>
            <div className="rounded-[22px] bg-gradient-to-br from-[#2d1b6e] to-[#1a0f4a] p-8 text-white">
              <p className="text-xs tracking-widest uppercase font-mono text-white/50 mb-3">
                Purple Band
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  fontWeight: 300,
                  letterSpacing: '-0.035rem',
                }}
              >
                Enterprise AI Platform
              </p>
              <p className="text-sm text-white/60 mt-2">
                Full-width deep purple sections create dramatic visual breaks in the white page flow.
              </p>
            </div>
          </section>

          <Separator />

          {/* 05 — Forms */}
          <section id="forms">
            <SectionLabel>05 — {t('designSystem.sections.forms')}</SectionLabel>
            <SectionTitle>{t('designSystem.inputsControls')}</SectionTitle>
            <div className="max-w-sm space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="ds-email">Email address</Label>
                <Input id="ds-email" type="email" placeholder="you@example.com" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ds-message">Message</Label>
                <Textarea id="ds-message" placeholder="Your message..." rows={3} />
              </div>
              <p className="text-xs text-muted-foreground">
                Focus border:{' '}
                <code className="font-mono">#9b60aa</code> (Focus Purple) · Border:{' '}
                <code className="font-mono">#d9d9dd</code>
              </p>
            </div>
          </section>

          <Separator />

          {/* 06 — Feedback & Overlays */}
          <section id="feedback">
            <SectionLabel>06 — {t('designSystem.sections.feedback')}</SectionLabel>
            <SectionTitle>{t('designSystem.feedbackOverlays')}</SectionTitle>
            <div className="space-y-6">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Badges</p>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Avatars</p>
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarFallback>CH</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>YZ</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Skeletons</p>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-64" />
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-56" />
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Tooltip</p>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Tooltip using Focus Purple ring</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </section>

        </div>
      </div>
    </TooltipProvider>
  )
}
