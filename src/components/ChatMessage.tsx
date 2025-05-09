
import React from "react";
import { Message } from "../types/chat";
import { cn } from "@/lib/utils";
import { UserIcon } from "lucide-react";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "flex max-w-[80%] md:max-w-[70%] rounded-xl px-4 py-3",
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-none"
            : "bg-muted rounded-tl-none"
        )}
      >
        <div className="flex gap-3">
          {!isUser && (
            <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md bg-primary/10">
              <UserIcon className="h-4 w-4" />
            </div>
          )}
          <div className="flex flex-col">
            <p className="text-sm font-medium mb-1">
              {isUser ? "You" : "Social Boost AI"}
            </p>
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
