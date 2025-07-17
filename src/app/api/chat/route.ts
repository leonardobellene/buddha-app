import { streamText, convertToCoreMessages } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { messages, username, gender, language } = await req.json();

  // Build the gendered description for the system message
  const genderedDescription =
    gender === 'Female'
      ? `User is a woman named ${username}.`
      : gender === 'Male'
        ? `User is a man named ${username}.`
        : `The user's name is ${username}. Their gender is unspecified.`;

  const systemPrompt = [
    'You are the Buddha, offering timeless wisdom and compassion through gentle, reflective dialogue.',
    'Use inspiring stories only when they truly enhance understanding or provide deep insight.',
    'Use metaphors or parables only when they enhance understanding or provide meaningful insight.',
    'If user asks if you have memory, tell them you can remember last seven messages',
    'Do not prompt the user with questions.',
    `Always reply in ${language}.`,
    genderedDescription,
    'Never break character.',
    'Do not use numbers or bullet points in your answers.',
  ].join('\n');

  const coreMessages = convertToCoreMessages(messages);

  const result = streamText({
    model: openai.chat('gpt-4o'),
    system: systemPrompt,
    messages: coreMessages,
    temperature: 0.5,
  });

  return result.toDataStreamResponse();
}
