"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, User, Briefcase, Award, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocale } from "@/hooks/use-locale"
import { translations } from "@/lib/i18n"

export default function HomePage() {
  const { locale } = useLocale()
  const t = translations[locale]

  const sections = [
    {
      icon: User,
      title: t.home.aboutPreview,
      description: t.home.aboutDescription,
      href: "/about",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Briefcase,
      title: t.home.projectsPreview,
      description: t.home.projectsDescription,
      href: "/projects",
      color: "text-green-600 dark:text-green-400",
    },
    {
      icon: Award,
      title: t.home.skillsPreview,
      description: t.home.skillsDescription,
      href: "/skills",
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: Mail,
      title: t.home.contactPreview,
      description: t.home.contactDescription,
      href: "/contact",
      color: "text-orange-600 dark:text-orange-400",
    },
  ]

  return (
    <div className="min-h-screen">
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="text-center lg:text-left">
                <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-balance">{t.home.title}</h1>
                <p className="text-xl lg:text-2xl text-muted-foreground mb-8 text-pretty">{t.home.subtitle}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button asChild size="lg" className="text-lg px-8">
                    <Link href="/contact">
                      {t.home.cta}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                    <Link href="/projects">Projekte ansehen</Link>
                  </Button>
                </div>
              </div>

              {/* Portrait Image */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl transform rotate-3"></div>
                  <div className="relative bg-background rounded-2xl p-2 shadow-2xl">
                    <Image
                      src="/guru.png"
                      alt="Kevin Poppe - Fullstack Web Developer"
                      width={400}
                      height={600}
                      className="rounded-xl object-cover w-full max-w-sm lg:max-w-md"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Sections */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Entdecken Sie mein Portfolio</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                Erfahren Sie mehr über mich, meine Projekte und Fähigkeiten
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {sections.map((section, index) => {
                const Icon = section.icon
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-muted">
                          <Icon className={`h-6 w-6 ${section.color}`} />
                        </div>
                        <CardTitle className="text-xl">{section.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base mb-4 text-pretty">{section.description}</CardDescription>
                      <Button asChild variant="ghost" className="p-0 h-auto font-semibold group-hover:text-primary">
                        <Link href={section.href} className="flex items-center gap-2">
                          Mehr erfahren
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-balance">Bereit für Ihr nächstes Projekt?</h2>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Lassen Sie uns gemeinsam Ihre Ideen in die Realität umsetzen. Kontaktieren Sie mich für ein
              unverbindliches Gespräch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/contact">
                  {t.home.cta}
                  <Mail className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <Link href="/about">Mehr über mich</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
