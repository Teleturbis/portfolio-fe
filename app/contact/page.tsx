"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useLocale } from "@/hooks/use-locale"
import { translations } from "@/lib/i18n"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { locale } = useLocale()
  const t = translations[locale]
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const contactInfo = [
    {
      icon: Mail,
      label: "E-Mail",
      value: "hello@developer.com",
      href: "mailto:hello@developer.com",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Phone,
      label: "Telefon",
      value: "+49 123 456 7890",
      href: "tel:+491234567890",
      color: "text-green-600 dark:text-green-400",
    },
    {
      icon: MapPin,
      label: "Standort",
      value: "Deutschland",
      href: null,
      color: "text-orange-600 dark:text-orange-400",
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/developer",
      color: "hover:text-gray-900 dark:hover:text-gray-100",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/developer",
      color: "hover:text-blue-600",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://twitter.com/developer",
      color: "hover:text-blue-400",
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Nachricht gesendet!",
        description: "Vielen Dank für Ihre Nachricht. Ich melde mich bald bei Ihnen.",
      })

      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      toast({
        title: "Fehler beim Senden",
        description: "Bitte versuchen Sie es später erneut oder kontaktieren Sie mich direkt.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">{t.contact.title}</h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">{t.contact.subtitle}</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="order-2 lg:order-1">
              <CardHeader>
                <CardTitle className="text-2xl">Nachricht senden</CardTitle>
                <CardDescription>
                  Füllen Sie das Formular aus und ich melde mich schnellstmöglich bei Ihnen.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.contact.form.name}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Ihr vollständiger Name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t.contact.form.email}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="ihre.email@beispiel.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t.contact.form.message}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Beschreiben Sie Ihr Projekt oder Ihre Anfrage..."
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Wird gesendet...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        {t.contact.form.send}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* Contact Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Kontaktinformationen</CardTitle>
                  <CardDescription>Erreichen Sie mich über diese Kanäle</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon
                    const content = (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="p-3 rounded-lg bg-muted">
                          <Icon className={`h-5 w-5 ${info.color}`} />
                        </div>
                        <div>
                          <div className="font-medium">{info.label}</div>
                          <div className="text-muted-foreground">{info.value}</div>
                        </div>
                      </div>
                    )

                    return info.href ? (
                      <a key={index} href={info.href} className="block">
                        {content}
                      </a>
                    ) : (
                      <div key={index}>{content}</div>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Social Media</CardTitle>
                  <CardDescription>Folgen Sie mir auf diesen Plattformen</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon
                      return (
                        <a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors ${social.color}`}
                          aria-label={social.label}
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Availability */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Verfügbarkeit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Verfügbar für neue Projekte</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Remote & vor Ort möglich</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Antwort innerhalb von 24h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Additional CTA */}
        <div className="max-w-4xl mx-auto text-center mt-20 p-8 bg-muted/30 rounded-2xl">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-balance">Bereit für den nächsten Schritt?</h2>
          <p className="text-lg text-muted-foreground mb-6 text-pretty max-w-2xl mx-auto">
            Schauen Sie sich meine bisherigen Arbeiten an oder erfahren Sie mehr über meine Fähigkeiten.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">Projekte ansehen</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/skills">Skills entdecken</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
