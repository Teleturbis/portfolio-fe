export const defaultLocale = "de" as const
export const locales = ["de", "en"] as const

export type Locale = (typeof locales)[number]

export const translations = {
  de: {
    nav: {
      home: "Startseite",
      about: "Über mich",
      projects: "Projekte",
      skills: "Skills",
      contact: "Kontakt",
    },
    home: {
      title: "Fullstack Webdeveloper",
      subtitle:
        "Ich entwickle moderne Webanwendungen mit Leidenschaft für sauberen Code und benutzerfreundliche Interfaces.",
      cta: "Jetzt kontaktieren",
      aboutPreview: "Mein Weg",
      aboutDescription: "Von den ersten Programmierzeilen bis heute - entdecken Sie meine Reise als Entwickler.",
      projectsPreview: "Meine Projekte",
      projectsDescription: "Eine Auswahl meiner besten Arbeiten und Projekte, die meine Fähigkeiten demonstrieren.",
      skillsPreview: "Meine Skills",
      skillsDescription: "Die Technologien und Tools, mit denen ich täglich arbeite und meine Expertise.",
      contactPreview: "Kontakt",
      contactDescription: "Lassen Sie uns über Ihr nächstes Projekt sprechen. Ich freue mich auf Ihre Nachricht.",
    },
    about: {
      title: "Mein Weg als Entwickler",
      subtitle: "Eine Reise durch meine berufliche Entwicklung",
    },
    projects: {
      title: "Meine Projekte",
      subtitle: "Eine Auswahl meiner besten Arbeiten",
    },
    skills: {
      title: "Meine Skills",
      subtitle: "Technologien und Tools, die ich beherrsche",
    },
    contact: {
      title: "Kontakt",
      subtitle: "Lassen Sie uns zusammenarbeiten",
      form: {
        name: "Name",
        email: "E-Mail",
        message: "Nachricht",
        send: "Nachricht senden",
        success: "Nachricht erfolgreich gesendet!",
        error: "Fehler beim Senden der Nachricht.",
      },
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
    },
    home: {
      title: "Fullstack Web Developer",
      subtitle: "I develop modern web applications with passion for clean code and user-friendly interfaces.",
      cta: "Contact me now",
      aboutPreview: "My Journey",
      aboutDescription: "From the first lines of code to today - discover my journey as a developer.",
      projectsPreview: "My Projects",
      projectsDescription: "A selection of my best work and projects that demonstrate my skills.",
      skillsPreview: "My Skills",
      skillsDescription: "The technologies and tools I work with daily and my expertise.",
      contactPreview: "Contact",
      contactDescription: "Let's talk about your next project. I look forward to your message.",
    },
    about: {
      title: "My Journey as a Developer",
      subtitle: "A journey through my professional development",
    },
    projects: {
      title: "My Projects",
      subtitle: "A selection of my best work",
    },
    skills: {
      title: "My Skills",
      subtitle: "Technologies and tools I master",
    },
    contact: {
      title: "Contact",
      subtitle: "Let's work together",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send message",
        success: "Message sent successfully!",
        error: "Error sending message.",
      },
    },
  },
} as const
