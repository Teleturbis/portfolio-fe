"use client"

import Link from "next/link"
import { MapPin, ArrowRight, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/hooks/use-locale"
import { translations } from "@/lib/i18n"

export default function AboutPage() {
  const { locale } = useLocale()
  const t = translations[locale]

  const timelineEvents = [
    {
      year: "2018",
      title: "Erste Schritte in der Programmierung",
      description:
        "Beginn meiner Reise mit HTML, CSS und JavaScript. Erste kleine Projekte und das Entdecken der Leidenschaft für Webentwicklung.",
      location: "Selbststudium",
      image: "/person-learning-to-code-at-computer.jpg",
      tags: ["HTML", "CSS", "JavaScript"],
    },
    {
      year: "2019",
      title: "Frontend-Spezialisierung",
      description:
        "Vertiefung in moderne Frontend-Frameworks wie React und Vue.js. Erste kommerzielle Projekte und Freelance-Arbeiten.",
      location: "Freelance",
      image: "/modern-web-development-workspace-with-multiple-mon.jpg",
      tags: ["React", "Vue.js", "SASS", "Webpack"],
    },
    {
      year: "2020",
      title: "Fullstack-Entwicklung",
      description:
        "Erweiterung der Kenntnisse auf Backend-Technologien. Node.js, Express und Datenbankdesign wurden zu wichtigen Bausteinen.",
      location: "Remote Work",
      image: "/fullstack-developer-working-on-backend-code.jpg",
      tags: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
    },
    {
      year: "2021",
      title: "Cloud & DevOps",
      description:
        "Fokus auf moderne Deployment-Strategien und Cloud-Technologien. CI/CD-Pipelines und containerisierte Anwendungen.",
      location: "Tech Startup",
      image: "/cloud-infrastructure-and-devops-dashboard.jpg",
      tags: ["Docker", "AWS", "CI/CD", "Kubernetes"],
    },
    {
      year: "2022",
      title: "Team Leadership",
      description:
        "Übernahme von Führungsverantwortung in Entwicklungsteams. Mentoring von Junior-Entwicklern und Projektmanagement.",
      location: "Senior Position",
      image: "/team-meeting-with-developers-discussing-code.jpg",
      tags: ["Leadership", "Mentoring", "Agile", "Scrum"],
    },
    {
      year: "2023-2024",
      title: "Moderne Technologien",
      description:
        "Spezialisierung auf Next.js, TypeScript und moderne AI-Integration. Fokus auf Performance und Benutzererfahrung.",
      location: "Freelance & Consulting",
      image: "/modern-web-development-with-ai-tools-and-next-js.jpg",
      tags: ["Next.js", "TypeScript", "AI Integration", "Performance"],
    },
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">{t.about.title}</h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">{t.about.subtitle}</p>
        </div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:transform md:-translate-x-0.5"></div>

            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background md:transform md:-translate-x-2 z-10"></div>

                {/* Content */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-12 pl-12 md:pl-0" : "md:pl-12 pl-12"}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="text-sm font-bold">
                          {event.year}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-balance">{event.title}</h3>
                      <p className="text-muted-foreground mb-4 text-pretty">{event.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {event.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center mt-20 p-8 bg-muted/30 rounded-2xl">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-balance">Interessiert an einer Zusammenarbeit?</h2>
          <p className="text-lg text-muted-foreground mb-6 text-pretty max-w-2xl mx-auto">
            Meine Erfahrung und Leidenschaft für sauberen Code können Ihr nächstes Projekt zum Erfolg führen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">
                {t.home.cta}
                <Mail className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">
                Projekte ansehen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
