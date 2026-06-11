'use server';

import { sendContactMessage } from '@/lib/supabase/queries';
import { ContactSchema } from '@/lib/schemas';

export async function submitContact(data: unknown) {
  const result = ContactSchema.safeParse(data);

  if (!result.success) {
    return { ok: false, errors: result.error.flatten().fieldErrors };
  }

  // Drop empty optional fields so they're stored as null
  const message = Object.fromEntries(
    Object.entries(result.data).filter(([, v]) => v !== '' && v !== undefined)
  ) as typeof result.data;

  return sendContactMessage(message);
}
