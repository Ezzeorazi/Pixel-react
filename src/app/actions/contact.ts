'use server';

import { sendContactMessage } from '@/lib/supabase/queries';
import type { ContactMessage } from '@/lib/types';

export async function submitContact(data: ContactMessage) {
  if (!data.name || !data.email || !data.message) {
    return { ok: false, error: 'Missing required fields' };
  }
  return sendContactMessage(data);
}
