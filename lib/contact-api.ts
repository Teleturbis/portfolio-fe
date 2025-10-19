import type {
  ContactFormData,
  ContactApiResponse,
  ContactApiError,
} from '@/types/contact';

class ContactApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'https://api.kevinpoppe.com';
  }

  /**
   * Send contact form data to backend
   */
  async sendContactForm(data: ContactFormData): Promise<ContactApiResponse> {
    const url = `${this.baseUrl}/api/contact`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        // credentials: 'include',
        body: JSON.stringify(data),
      });

      const result = (await response.json()) as
        | ContactApiResponse
        | ContactApiError;

      if (!response.ok) {
        // Handle HTTP errors
        const errorResult = result as ContactApiError;
        throw new Error(
          errorResult.message ||
            `HTTP ${response.status}: ${response.statusText}`
        );
      }

      return result as ContactApiResponse;
    } catch (error) {
      // Handle network errors or JSON parsing errors
      if (error instanceof Error) {
        throw error;
      }

      throw new Error(
        'An unexpected error occurred while sending the contact form'
      );
    }
  }

  /**
   * Check if API is reachable
   */
  async healthCheck(): Promise<boolean> {
    try {
      const url = `${this.baseUrl}/health`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Get the configured API URL
   */
  getApiUrl(): string {
    return this.baseUrl;
  }
}

// Export singleton instance
export const contactApi = new ContactApiClient();
