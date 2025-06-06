// utils/openai.ts
import { OpenAI } from 'openai';
import { Message as ChatMessage } from '../types';

// Initialize OpenAI with the API key from environment variables
const openai = new OpenAI({
  baseURL:"https://api.deepinfra.com/v1/openai",
  apiKey: "nBdK0KcYvh2db6eyTosq1tTGxSb247eW"!, // The `!` asserts that it's defined; ensure it's set
  dangerouslyAllowBrowser: true,
});

// Message format for OpenAI SDK
type OpenAIMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

// Chat function using real OpenAI SDK
export const sendMessageToChatGPT = async (
  message: string,
  previousMessages: ChatMessage[]
): Promise<string> => {
  try {
    const chatHistory: OpenAIMessage[] = [
      {
        role: 'system',
        content:
          'You are a helpful assistant that teaches people how to use digital tools like WhatsApp, Paytm, and Google Maps with simple language and step-by-step guides.',
      },
      ...previousMessages.map((msg) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      {
        role: 'user',
        content: message,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: 'meta-llama/Meta-Llama-3.1-70B-Instruct',
      messages: chatHistory,
      temperature: 0.7,
    });
    console.log(completion)

    return completion.choices[0].message.content!.trim();
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return 'Sorry, I could not get a response from the assistant. Please try again later.';
  }
};
