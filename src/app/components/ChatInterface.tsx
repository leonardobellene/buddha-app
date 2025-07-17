'use client';
import { useState, useRef, useEffect } from 'react';
import ChatHeader from '@/app/components/ChatHeader';
import MessageList from '@/app/components/MessageList';
import ChatInput from '@/app/components/ChatInput';
import { useAuth } from '@/app/hooks/useAuth';
import { useStreamHandler } from '@/app/hooks/useStreamHandler';
import { sendChatMessage } from '@/app/services/chatService';
import { Message } from '@/app/types/chat';
import { getUserInfo } from '@/app/lib/storage';

export default function ChatInterface() {
  // Local state
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [language, setLanguage] = useState('English'); // Default language
  const hasStartedStreamingRef = useRef(false);

  // Get user's language safely on client side
  useEffect(() => {
    const { language: userLanguage } = getUserInfo();
    setLanguage(userLanguage);
  }, []);

  // Custom hook for reusable auth logic
  const { loading, initialMessage } = useAuth();
  
  // Set initial message when available
  useEffect(() => {
    if (initialMessage && messages.length === 0) {
      setMessages([initialMessage]);
    }
  }, [initialMessage, messages.length]);

  const updateLastMessage = (content: string) => {
    setMessages((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = { ...updated[updated.length - 1], content };
      return updated;
    });
  };

  const { processStream } = useStreamHandler(updateLastMessage, hasStartedStreamingRef);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userInput = input;
    const userMessage: Message = { role: 'user', content: userInput };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);
    hasStartedStreamingRef.current = false;

    try {
      const response = await sendChatMessage(userInput, messages);
      const reader = response.body!.pipeThrough(new TextDecoderStream()).getReader();
      
      // Add empty Buddha message for streaming
      setMessages((prev) => [...prev, { role: 'buddha', content: '' }]);
      await processStream(reader);
      
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: 'buddha', content: 'Something went wrong. Try again soon.' }
      ]);
    }

    setIsThinking(false);
  };

  if (loading) return null;

  return (
    <div className="flex flex-col h-screen text-gray-100">
      <ChatHeader />
      <MessageList
        messages={messages}
        isThinking={isThinking}
        hasStartedStreaming={hasStartedStreamingRef.current}
      />
      <ChatInput 
        value={input} 
        onChange={setInput} 
        onSend={sendMessage} 
        isThinking={isThinking}
        language={language}
      />
    </div>
  );
}
