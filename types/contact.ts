// Contact API Types
export interface ContactFormData {
  mail: string;
  name: string;
  subject: string;
  message: string;
  company?: string;
  phone?: string;
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export interface ContactApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
