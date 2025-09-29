"use client"

import Link from "next/link"
import { TrendingUp, Award, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useLocale } from "@/hooks/use-locale"
import { translations } from "@/lib/i18n"

export default function SkillsPage() {
  const { locale } = useLocale()
  const t = translations[locale]

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: "🎨",
      description: "Moderne Benutzeroberflächen und interaktive Webanwendungen",
      skills: [
        { name: "React", level: 95, years: 5, projects: 25 },
        { name: "Next.js", level: 90, years: 3, projects: 15 },
        { name: "TypeScript", level: 88, years: 4, projects: 20 },
        { name: "Tailwind CSS", level: 92, years: 3, projects: 18 },
        { name: "Vue.js", level: 85, years: 3, projects: 12 },
        { name: "Angular", level: 80, years: 2, projects: 8 },
      ],
    },
    {
      title: "Backend Development",
      icon: "⚙️",
      description: "Robuste Server-Architekturen und APIs",
      skills: [
        { name: "Node.js", level: 90, years: 4, projects: 22 },
        { name: "Express.js", level: 88, years: 4, projects: 20 },
        { name: "NestJS", level: 85, years: 2, projects: 10 },
        { name: "Python", level: 82, years: 3, projects: 15 },
        { name: "PHP/Laravel", level: 80, years: 3, projects: 12 },
        { name: "GraphQL", level: 78, years: 2, projects: 8 },
      ],
    },
    {
      title: "Database & Cloud",
      icon: "☁️",
      description: "Datenmanagement und Cloud-Infrastruktur",
      skills: [
        { name: "PostgreSQL", level: 88, years: 4, projects: 18 },
        { name: "MongoDB", level: 85, years: 3, projects: 15 },
        { name: "AWS", level: 82, years: 3, projects: 12 },
        { name: "Docker", level: 80, years: 3, projects: 14 },
        { name: "Redis", level: 78, years: 2, projects: 10 },
        { name: "Kubernetes", level: 75, years: 2, projects: 6 },
      ],
    },
    {
      title: "Tools & Workflow",
      icon: "🛠️",
      description: "Entwicklungstools und Projektmanagement",
      skills: [
        { name: "Git/GitHub", level: 95, years: 6, projects: 30 },
        { name: "VS Code", level: 92, years: 5, projects: 30 },
        { name: "Figma", level: 85, years: 3, projects: 20 },
        { name: "Jest/Testing", level: 82, years: 3, projects: 15 },
        { name: "CI/CD", level: 80, years: 2, projects: 12 },
        { name: "Agile/Scrum", level: 88, years: 4, projects: 25 },
      ],
    },
  ]

  const certifications = [
    {
      title: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      year: "2023",
      badge: "aws",
    },
    {
      title: "React Professional Certificate",
      issuer: "Meta",
      year: "2022",
      badge: "react",
    },
    {
      title: "Google Cloud Professional",
      issuer: "Google Cloud",
      year: "2023",
      badge: "gcp",
    },
  ]

  const getSkillColor = (level: number) => {
    if (level >= 90) return "bg-green-500"
    if (level >= 80) return "bg-blue-500"
    if (level >= 70) return "bg-yellow-500"
    return "bg-gray-500"
  }

  const getSkillLevel = (level: number) => {
    if (level >= 90) return "Expert"
    if (level >= 80) return "Fortgeschritten"
    if (level >= 70) return "Mittel"
    return "Grundlagen"
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">{t.skills.title}</h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">{t.skills.subtitle}</p>
        </div>

        {/* Skills Overview Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">6+</div>
              <div className="text-sm text-muted-foreground">Jahre Erfahrung</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Projekte abgeschlossen</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">20+</div>
              <div className="text-sm text-muted-foreground">Technologien beherrscht</div>
            </CardContent>
          </Card>
        </div>

        {/* Skills Categories */}
        <div className="space-y-12 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="text-center mb-8">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h2 className="text-2xl lg:text-3xl font-bold mb-2">{category.title}</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">{category.description}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <Card key={skillIndex} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{skill.name}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {getSkillLevel(skill.level)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Kenntnisstand</span>
                            <span>{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>

                        <div className="flex justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            {skill.years} Jahre
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="h-3 w-3" />
                            {skill.projects} Projekte
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">Zertifizierungen</h2>
            <p className="text-muted-foreground">Kontinuierliche Weiterbildung und anerkannte Qualifikationen</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-balance">{cert.title}</CardTitle>
                  <CardDescription>{cert.issuer}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">{cert.year}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center mt-20 p-8 bg-muted/30 rounded-2xl">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-balance">
            Suchen Sie einen Entwickler mit diesen Skills?
          </h2>
          <p className="text-lg text-muted-foreground mb-6 text-pretty max-w-2xl mx-auto">
            Meine vielfältigen Fähigkeiten und jahrelange Erfahrung können Ihr Projekt zum Erfolg führen. Lassen Sie uns
            über Ihre Anforderungen sprechen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">
                {t.home.cta}
                <Mail className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">Projekte ansehen</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
