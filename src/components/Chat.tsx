
import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { Message } from "../types/chat";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { generateResponse } from "../services/deepSeekService";
import { toast } from "sonner";

interface ChatProps {
  apiKey: string;
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  content:
    "Hi there! 👋 I'm your Social Boost AI assistant. I can help you improve your social interactions, overcome social anxiety, or build better relationships. How can I assist you today?",
  role: "assistant",
  timestamp: new Date(),
};

const Chat: React.FC<ChatProps> = ({ apiKey }) => {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: uuidv4(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const formattedMessages = messages
        .filter((msg) => msg.id !== "welcome")
        .concat(userMessage)
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

      const response = await generateResponse(formattedMessages, apiKey);

      const assistantMessage: Message = {
        id: uuidv4(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error("Error getting response:", error);
      toast.error(
        "Failed to get a response. Please check your API key and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([WELCOME_MESSAGE]);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto h-[600px] flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Social Boost AI Chat</h2>
        <Button variant="outline" onClick={handleNewChat}>
          New Chat
        </Button>
      </div>

      <CardContent className="flex-1 p-0 flex flex-col">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-start w-full mb-4">
              <div className="bg-muted rounded-xl rounded-tl-none px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-150"></div>
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-300"></div>
                  <span className="text-sm text-muted-foreground ml-2">
                    Thinking...
                  </span>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>

        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </CardContent>
    </Card>
  );
};

export default Chat;
