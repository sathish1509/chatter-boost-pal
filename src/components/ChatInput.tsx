
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center space-x-2 p-4 border-t bg-background"
    >
      <Input
        className="flex-1"
        placeholder={
          disabled ? "Waiting for response..." : "Type your message..."
        }
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
      />
      <Button
        type="submit"
        size="icon"
        disabled={disabled || !input.trim()}
        className="h-10 w-10"
      >
        <SendIcon className="h-4 w-4" />
        <span className="sr-only">Send</span>
      </Button>
    </form>
  );
};

export default ChatInput;
