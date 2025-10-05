// Umami Analytics Global Types
declare global {
  interface Window {
    umami?: {
      /**
       * Track a page view
       * @param properties - Optional properties for the page view
       */
      track(
        properties?: Record<string, string | number | boolean>
      ): Promise<void>;

      /**
       * Track a custom event
       * @param eventName - Name of the event
       * @param eventData - Optional data associated with the event
       */
      track(
        eventName: string,
        eventData?: Record<string, string | number | boolean>
      ): Promise<void>;

      /**
       * Identify a user (for user tracking)
       * @param userData - User identification data
       */
      identify(
        userData: Record<string, string | number | boolean>
      ): Promise<void>;
    };
  }
}

// Umami Event Types for better type safety
export type UmamiEventData = Record<string, string | number | boolean>;

// Predefined event types for your portfolio
export type PortfolioEvent =
  | 'navigation_click'
  | 'theme_toggle'
  | 'locale_change'
  | 'contact_form_submit'
  | 'project_view'
  | 'download_cv'
  | 'external_link_click';

// Utility type for Umami tracking
export interface UmamiTrackingProps {
  event: PortfolioEvent;
  data?: UmamiEventData;
}

// Make the file a module
export {};
