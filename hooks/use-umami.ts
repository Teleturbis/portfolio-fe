'use client';

import { useCallback } from 'react';
import type { PortfolioEvent, UmamiEventData } from '@/types/global';

/**
 * Hook for Umami analytics tracking
 * Provides type-safe methods for tracking events and page views
 */
export function useUmami() {
  const track = useCallback(
    async (
      eventOrProperties:
        | PortfolioEvent
        | Record<string, string | number | boolean>,
      eventData?: UmamiEventData
    ) => {
      if (typeof window === 'undefined' || !window.umami) {
        // Skip tracking in SSR or if Umami is not loaded
        return;
      }

      try {
        if (typeof eventOrProperties === 'string') {
          // Track custom event
          await window.umami.track(eventOrProperties, eventData);
        } else {
          // Track page view with properties
          await window.umami.track(eventOrProperties);
        }
      } catch (error) {
        // eslint-disable-next-line no-console -- Umami tracking error
        console.warn('Umami tracking failed:', error);
      }
    },
    []
  );

  const trackPageView = useCallback(
    async (properties?: Record<string, string | number | boolean>) => {
      if (typeof window === 'undefined' || !window.umami) {
        return;
      }

      try {
        await window.umami.track(properties);
      } catch (error) {
        // eslint-disable-next-line no-console -- Umami tracking error
        console.warn('Umami page view tracking failed:', error);
      }
    },
    []
  );

  const trackEvent = useCallback(
    async (event: PortfolioEvent, data?: UmamiEventData) => {
      if (typeof window === 'undefined' || !window.umami) {
        return;
      }

      try {
        await window.umami.track(event, data);
      } catch (error) {
        // eslint-disable-next-line no-console -- Umami tracking error
        console.warn('Umami event tracking failed:', error);
      }
    },
    []
  );

  const identify = useCallback(
    async (userData: Record<string, string | number | boolean>) => {
      if (typeof window === 'undefined' || !window.umami) {
        return;
      }

      try {
        await window.umami.identify(userData);
      } catch (error) {
        // eslint-disable-next-line no-console -- Umami tracking error
        console.warn('Umami identify failed:', error);
      }
    },
    []
  );

  return {
    track,
    trackPageView,
    trackEvent,
    identify,
    isLoaded: typeof window !== 'undefined' && !!window.umami,
  };
}
