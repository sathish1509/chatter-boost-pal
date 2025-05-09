
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface ApiKeyFormProps {
  onSubmit: (apiKey: string) => void;
}

export default function ApiKeyForm({ onSubmit }: ApiKeyFormProps) {
  const [apiKey, setApiKey] = useState<string>("");
  const [showKey, setShowKey] = useState<boolean>(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem("deepseek_api_key", apiKey);
      onSubmit(apiKey);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">DeepSeek API Key Required</CardTitle>
        <CardDescription>
          Please enter your DeepSeek API key to use the Social Boost AI chatbot.
          Your API key is stored locally in your browser.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <div className="flex gap-2">
              <Input
                id="apiKey"
                type={showKey ? "text" : "password"}
                placeholder="Enter your DeepSeek API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowKey(!showKey)}
                className="px-3"
              >
                {showKey ? "Hide" : "Show"}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Don't have an API key?{" "}
              <a
                href="https://deepseek.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Get one from DeepSeek
              </a>
            </p>
          </div>
          
          <Button type="submit" className="w-full" disabled={!apiKey.trim()}>
            Submit Key and Start Chatting
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
