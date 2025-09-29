"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Heart } from "lucide-react"
import { useLocale } from "@/hooks/use-locale"
import { translations } from "@/lib/i18n"

export function Footer() {
  const { locale } = useLocale()
  const t = translations[locale]

  const footerLinks = {
    navigation: [
      { href: "/", label: t.nav.home },
      { href: "/about", label: t.nav.about },
      { href: "/projects", label: t.nav.projects },
      { href: "/skills", label: t.nav.skills },
      { href: "/contact", label: t.nav.contact },
    ],
    contact: [
      { icon: Mail, label: "hello@developer.com", href: "mailto:hello@developer.com" },
      { icon: Phone, label: "+49 123 456 7890", href: "tel:+491234567890" },
      { icon: MapPin, label: "Deutschland", href: null },
    ],
    social: [
      { icon: Github, label: "GitHub", href: "https://github.com/developer" },
      { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/developer" },
      { icon: Twitter, label: "Twitter", href: "https://twitter.com/developer" },
    ],
  }

  return (
    <footer className="bg-muted/30 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-bold text-xl mb-4 block">
              Portfolio
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Fullstack Web Developer mit Leidenschaft für sauberen Code und moderne Technologien.
            </p>
            <div className="flex space-x-3">
              {footerLinks.social.map((social, index) => {
                const Icon = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-background hover:bg-muted transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-2">
              {footerLinks.contact.map((contact, index) => {
                const Icon = contact.icon
                const content = (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Icon className="h-4 w-4" />
                    {contact.label}
                  </div>
                )

                return <li key={index}>{contact.href ? <a href={contact.href}>{content}</a> : <div>{content}</div>}</li>
              })}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="font-semibold mb-4">Projekt starten</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Bereit für Ihr nächstes Projekt? Lassen Sie uns sprechen!
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              <Mail className="h-4 w-4" />
              {t.home.cta}
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">© 2025 Portfolio. Alle Rechte vorbehalten.</p>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-red-500" /> using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
