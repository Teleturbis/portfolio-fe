'use client'

import { useState, useCallback } from 'react'
import { contactApi } from '@/lib/contact-api'
import { useUmami } from '@/hooks/use-umami'
import type { ContactFormData, ContactApiResponse } from '@/types/contact'

interface UseContactFormOptions {
  onSuccess?: (response: ContactApiResponse) => void
  onError?: (error: Error) => void
}

export function useContactForm(options: UseContactFormOptions = {}) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { trackEvent } = useUmami()

  const submitForm = useCallback(async (data: ContactFormData) => {
    setIsLoading(true)
    setError(null)
    setIsSuccess(false)

    try {
      // Track form submission attempt
      await trackEvent('contact_form_submit', {
        has_company: Boolean(data.company),
        has_phone: Boolean(data.phone),
        subject_length: data.subject.length,
        message_length: data.message.length
      })

      const response = await contactApi.sendContactForm(data)
      
      setIsSuccess(true)
      options.onSuccess?.(response)

      // Track successful submission
      await trackEvent('contact_form_submit', {
        status: 'success',
        has_company: Boolean(data.company),
        has_phone: Boolean(data.phone)
      })

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message'
      setError(errorMessage)
      options.onError?.(err instanceof Error ? err : new Error(errorMessage))

      // Track failed submission
      await trackEvent('contact_form_submit', {
        status: 'error',
        error_type: err instanceof Error ? err.constructor.name : 'unknown'
      })
    } finally {
      setIsLoading(false)
    }
  }, [options, trackEvent])

  const reset = useCallback(() => {
    setIsLoading(false)
    setIsSuccess(false)
    setError(null)
  }, [])

  return {
    submitForm,
    reset,
    isLoading,
    isSuccess,
    error,
    apiUrl: contactApi.getApiUrl()
  }
}