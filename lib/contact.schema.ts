import { z } from 'zod';

/**
 * Zod Schema für Kontaktanfragen
 */
export const ContactRequestSchema = z.object({
  mail: z
    .string()
    .min(1, 'E-Mail-Adresse ist erforderlich')
    .email('Ungültige E-Mail-Adresse')
    // Simple regex to check for at least 2 chars before and after '@' and a dot in the domain part with at least2 chars as tld
    .regex(/^[^\s@]{2,}@[^\s@]+\.[^\s@]{2,}$/, 'Ungültige E-Mail-Adresse')
    .max(254, 'E-Mail-Adresse ist zu lang'),

  name: z
    .string()
    .min(2, 'Name muss mindestens 2 Zeichen lang sein')
    .max(100, 'Name ist zu lang')
    .regex(/^[a-zA-ZäöüÄÖÜß\s\-']+$/, 'Name enthält ungültige Zeichen'),

  subject: z
    .string()
    .min(3, 'Betreff muss mindestens 3 Zeichen lang sein')
    .max(200, 'Betreff ist zu lang'),

  message: z
    .string()
    .min(10, 'Nachricht muss mindestens 10 Zeichen lang sein')
    .max(5000, 'Nachricht ist zu lang'),

  company: z
    .string()
    .max(100, 'Firmenname ist zu lang')
    .regex(
      /^[a-zA-ZäöüÄÖÜß0-9\s\-&.,()]+$/,
      'Firmenname enthält ungültige Zeichen'
    )
    .optional()
    .or(z.literal('')),

  phone: z
    .string()
    .regex(/^[+]?[\d\s\-().]{7,20}$/, 'Ungültige Telefonnummer')
    .optional()
    .or(z.literal('')),
});

// TypeScript-Type aus dem Schema ableiten
export type ContactRequest = z.infer<typeof ContactRequestSchema>;

/**
 * Validiert eine Kontaktanfrage mit Zod
 */
export const validateContactRequest = (
  data: unknown
): {
  success: boolean;
  data: ContactRequest | null;
  errors: Array<{ field: string; message: string }>;
} => {
  try {
    const validatedData = ContactRequestSchema.parse(data);
    return {
      success: true,
      data: validatedData,
      errors: [],
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        data: null,
        errors: error.issues.map((err: z.ZodIssue) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      };
    }
    return {
      success: false,
      data: null,
      errors: [{ field: 'unknown', message: 'Unbekannter Validierungsfehler' }],
    };
  }
};

/**
 * Sanitisiert einen String (entfernt potentiell gefährliche Zeichen)
 */
export const sanitizeString = (str: string): string => {
  return str.trim().replace(/[<>]/g, '');
};

/**
 * Sanitisiert alle String-Felder eines ContactRequest-Objekts
 */
export const sanitizeContactData = (data: ContactRequest): ContactRequest => {
  return {
    mail: sanitizeString(data.mail),
    name: sanitizeString(data.name),
    subject: sanitizeString(data.subject),
    message: sanitizeString(data.message),
    company: data.company ? sanitizeString(data.company) : undefined,
    phone: data.phone ? sanitizeString(data.phone) : undefined,
  };
};
