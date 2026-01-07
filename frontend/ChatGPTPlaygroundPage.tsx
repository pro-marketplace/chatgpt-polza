/**
 * ChatGPT Playground Page
 *
 * Ready-to-use page component for mounting on a route.
 * Example: /chatgpt or /ai-chat
 */

"use client";

import { ChatGPTPlayground } from "./ChatGPTPlayground";

interface ChatGPTPlaygroundPageProps {
  apiUrl: string;
  defaultModel?: string;
  systemPrompt?: string;
}

export function ChatGPTPlaygroundPage({
  apiUrl,
  defaultModel = "openai/gpt-4o-mini",
  systemPrompt,
}: ChatGPTPlaygroundPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4">
      <div className="max-w-4xl mx-auto h-[calc(100vh-2rem)]">
        <ChatGPTPlayground
          apiUrl={apiUrl}
          defaultModel={defaultModel}
          systemPrompt={systemPrompt}
          title="ChatGPT"
          placeholder="Ask anything..."
        />
      </div>
    </div>
  );
}

export default ChatGPTPlaygroundPage;
