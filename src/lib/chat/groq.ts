// Cliente mínimo para la API de Groq (compatible con OpenAI Chat Completions).
// Sin SDK: solo fetch. https://console.groq.com/docs

export const GROQ_MODEL = 'llama-3.3-70b-versatile';
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string | null;
  tool_calls?: ToolCall[];
  tool_call_id?: string;
  name?: string;
}

export interface ToolCall {
  id: string;
  type: 'function';
  function: { name: string; arguments: string };
}

interface GroqTool {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: Record<string, unknown>;
  };
}

interface GroqResponse {
  choices: { message: ChatMessage; finish_reason: string }[];
  error?: { message: string };
}

export async function groqChat(opts: {
  apiKey: string;
  messages: ChatMessage[];
  tools?: GroqTool[];
  temperature?: number;
  signal?: AbortSignal;
}): Promise<ChatMessage> {
  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${opts.apiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: opts.messages,
      tools: opts.tools,
      tool_choice: opts.tools ? 'auto' : undefined,
      temperature: opts.temperature ?? 0.6,
      max_tokens: 800,
    }),
    signal: opts.signal,
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Groq ${res.status}: ${body.slice(0, 300)}`);
  }

  const data = (await res.json()) as GroqResponse;
  if (data.error) throw new Error(`Groq: ${data.error.message}`);
  const message = data.choices?.[0]?.message;
  if (!message) throw new Error('Groq: respuesta vacía');
  return message;
}

// Definición de la herramienta de captura de leads.
export const CAPTURE_LEAD_TOOL: GroqTool = {
  type: 'function',
  function: {
    name: 'capturar_lead',
    description:
      'Registra los datos de contacto de un visitante interesado para que el equipo de Pixel Maker lo contacte. Llamar solo cuando se cuente con un nombre y al menos un medio de contacto (email o teléfono/WhatsApp).',
    parameters: {
      type: 'object',
      properties: {
        nombre: { type: 'string', description: 'Nombre del visitante' },
        email: { type: 'string', description: 'Email del visitante (si lo dio)' },
        telefono: { type: 'string', description: 'Teléfono o WhatsApp del visitante (si lo dio)' },
        interes: {
          type: 'string',
          description: 'Resumen breve de qué servicio o proyecto le interesa y cualquier detalle relevante.',
        },
      },
      required: ['nombre', 'interes'],
    },
  },
};
