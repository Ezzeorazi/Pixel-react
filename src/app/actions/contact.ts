'use server';

import { sendContactMessage } from '@/lib/supabase/queries';
import { ContactSchema } from '@/lib/schemas';

export async function submitContact(data: unknown) {
  const result = ContactSchema.safeParse(data);

  if (!result.success) {
    return { ok: false, errors: result.error.flatten().fieldErrors };
  }

  return sendContactMessage(result.data);
}
