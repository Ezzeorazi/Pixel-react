// Registro de eventos personalizados en Google Analytics 4 (gtag).
// El script de GA se carga en src/app/[locale]/layout.tsx solo si existe
// NEXT_PUBLIC_GA_ID. Si gtag no está disponible, las llamadas se ignoran.

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js' | 'set',
      targetOrName: string | Date,
      params?: Record<string, unknown>,
    ) => void;
  }
}

// Nombres de eventos clave que seguimos (GA4 recomienda snake_case).
export type AnalyticsEvent =
  | 'cta_click' // clicks en botones de llamada a la acción
  | 'quote_request' // pedido de cotización / "¿cuánto cuesta?"
  | 'service_card_click' // click en una tarjeta de servicio
  | 'whatsapp_click' // click en un contacto de WhatsApp
  | 'chat_open' // abrir el chatbot
  | 'chat_message_sent' // mensaje enviado al chatbot
  | 'contact_submit'; // envío exitoso del formulario de contacto

export function trackEvent(
  event: AnalyticsEvent,
  params?: Record<string, unknown>,
): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', event, params ?? {});
}

export {};
