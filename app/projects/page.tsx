"use client"

import Link from "next/link"
import { ExternalLink, Github, Calendar, Users, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/hooks/use-locale"
import { translations } from "@/lib/i18n"

export default function ProjectsPage() {
  const { locale } = useLocale()
  const t = translations[locale]

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Eine vollständige E-Commerce-Lösung mit Next.js, Stripe-Integration und Admin-Dashboard. Unterstützt mehrere Zahlungsmethoden und bietet eine intuitive Benutzererfahrung.",
      image: "/modern-ecommerce-interface.png",
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
      category: "Fullstack",
      year: "2024",
      team: "3 Entwickler",
      duration: "4 Monate",
      status: "Live",
      links: {
        demo: "https://example.com",
        github: "https://github.com/example/ecommerce",
      },
      highlights: ["Über 10.000 aktive Nutzer", "99.9% Uptime", "Mobile-first Design", "SEO-optimiert"],
    },
    {
      title: "Task Management App",
      description:
        "Eine kollaborative Projektmanagement-Anwendung mit Echtzeit-Updates, Drag-and-Drop-Funktionalität und Team-Collaboration-Features.",
      image: "/project-management-dashboard.png",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Material-UI"],
      category: "Fullstack",
      year: "2023",
      team: "2 Entwickler",
      duration: "3 Monate",
      status: "Live",
      links: {
        demo: "https://example.com",
        github: "https://github.com/example/taskmanager",
      },
      highlights: ["Echtzeit-Synchronisation", "Offline-Funktionalität", "Team-Collaboration", "Mobile App verfügbar"],
    },
    {
      title: "AI-Powered Analytics Dashboard",
      description:
        "Ein intelligentes Analytics-Dashboard mit KI-gestützten Insights und automatisierten Reports für Unternehmen.",
      image: "/ai-analytics-dashboard.png",
      technologies: ["Vue.js", "Python", "TensorFlow", "FastAPI", "Chart.js"],
      category: "AI/ML",
      year: "2023",
      team: "4 Entwickler",
      duration: "6 Monate",
      status: "Live",
      links: {
        demo: "https://example.com",
        github: "https://github.com/example/ai-dashboard",
      },
      highlights: [
        "Machine Learning Integration",
        "Predictive Analytics",
        "Automatisierte Reports",
        "Enterprise-ready",
      ],
    },
    {
      title: "Restaurant Booking System",
      description:
        "Ein umfassendes Reservierungssystem für Restaurants mit Online-Buchung, Tischverwaltung und Kundenverwaltung.",
      image: "/restaurant-booking-system-interface.jpg",
      technologies: ["Angular", "NestJS", "PostgreSQL", "Redis", "Bootstrap"],
      category: "Fullstack",
      year: "2022",
      team: "Solo-Projekt",
      duration: "2 Monate",
      status: "Live",
      links: {
        demo: "https://example.com",
        github: "https://github.com/example/restaurant-booking",
      },
      highlights: [
        "Automatische Bestätigungen",
        "Wartelisten-Management",
        "Multi-Restaurant Support",
        "SMS/Email Benachrichtigungen",
      ],
    },
    {
      title: "Fitness Tracking App",
      description:
        "Eine mobile-first Fitness-App mit Workout-Tracking, Ernährungsplanung und sozialen Features für Motivation.",
      image: "/fitness-tracking-app.png",
      technologies: ["React Native", "Express.js", "MongoDB", "AWS S3", "Expo"],
      category: "Mobile",
      year: "2022",
      team: "3 Entwickler",
      duration: "5 Monate",
      status: "Live",
      links: {
        demo: "https://example.com",
        github: "https://github.com/example/fitness-app",
      },
      highlights: ["Cross-Platform App", "Offline-Synchronisation", "Social Features", "50k+ Downloads"],
    },
    {
      title: "Content Management System",
      description:
        "Ein flexibles CMS mit Drag-and-Drop-Editor, Multi-Site-Management und erweiterbarer Plugin-Architektur.",
      image: "/cms-interface.png",
      technologies: ["Laravel", "Vue.js", "MySQL", "Docker", "AWS"],
      category: "Backend",
      year: "2021",
      team: "5 Entwickler",
      duration: "8 Monate",
      status: "Live",
      links: {
        demo: "https://example.com",
        github: "https://github.com/example/cms",
      },
      highlights: ["Plugin-System", "Multi-Tenant Architektur", "SEO-Tools integriert", "White-Label Lösung"],
    },
  ]

  const categories = ["Alle", "Fullstack", "Frontend", "Backend", "Mobile", "AI/ML"]

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">{t.projects.title}</h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">{t.projects.subtitle}</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              size="sm"
              className="hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary">{project.category}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant={project.status === "Live" ? "default" : "outline"}>{project.status}</Badge>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2 text-balance">{project.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {project.year}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {project.team}
                      </div>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base text-pretty">{project.description}</CardDescription>
              </CardHeader>

              <CardContent>
                {/* Technologies */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-2 text-sm">Highlights:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {project.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.links.demo && (
                    <Button asChild size="sm" className="flex-1">
                      <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {project.links.github && (
                    <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center mt-20 p-8 bg-muted/30 rounded-2xl">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-balance">Haben Sie ein ähnliches Projekt im Kopf?</h2>
          <p className="text-lg text-muted-foreground mb-6 text-pretty max-w-2xl mx-auto">
            Lassen Sie uns gemeinsam Ihre Idee in die Realität umsetzen. Ich bringe die Erfahrung und das Know-how mit,
            um Ihr Projekt erfolgreich zu realisieren.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">
                {t.home.cta}
                <Mail className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/skills">Meine Skills ansehen</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
