'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { trackEvent, type AnalyticsEvent } from '@/lib/analytics';

type Props = ComponentProps<typeof Link> & {
  event: AnalyticsEvent;
  eventParams?: Record<string, unknown>;
};

/**
 * <Link> que registra un evento de analytics al hacer click. Pensado para usar
 * dentro de Server Components (cruza el límite cliente sin convertir el padre).
 */
export function TrackedLink({ event, eventParams, onClick, ...props }: Props) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackEvent(event, eventParams);
        onClick?.(e);
      }}
    />
  );
}
