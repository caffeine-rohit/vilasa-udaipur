import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Convert UIMessage array (v4 schema) to CoreMessage array
  const coreMessages = messages.map((m: any) => ({
    role: m.role,
    content: m.parts 
      ? m.parts.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('') 
      : m.content
  }));

  const result = streamText({
    model: google('gemini-3.5-flash'),
    messages: coreMessages,
    system: `You are the digital concierge for Vilasa Udaipur, a top 0.1% ultra-luxury resort. 
    You must answer politely, concisely, and elegantly. 
    If the user asks questions about booking, tell them to use the Reserve option in the menu.
    Resort Information:
    - Check-in: 3:00 PM, Check-out: 12:00 PM
    - 30 exclusive suites and villas
    - Built in 1749 as a private summer retreat for royalty
    - Features private dining, spa sanctuaries, and historic architecture
    - Lake Pichola, Udaipur, Rajasthan, India
    Keep responses brief (1-3 short sentences). Match the luxurious, bespoke tone of the resort.`,
  });

  return result.toUIMessageStreamResponse();
}
