
import { useState, useEffect } from "react";
import Chat from "../components/Chat";
import ApiKeyForm from "../components/ApiKeyForm";

const Index = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  
  useEffect(() => {
    // Check for stored API key on component mount
    const storedApiKey = localStorage.getItem("deepseek_api_key");
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8 px-4">
      <header className="max-w-3xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">Social Boost AI</h1>
        <p className="text-gray-600 max-w-lg mx-auto">
          Your AI companion for improving social skills, reducing anxiety, and building meaningful connections
        </p>
      </header>
      
      <div className="max-w-4xl mx-auto">
        {apiKey ? (
          <Chat apiKey={apiKey} />
        ) : (
          <ApiKeyForm onSubmit={handleApiKeySubmit} />
        )}
      </div>

      <footer className="max-w-3xl mx-auto mt-8 text-center text-sm text-gray-500">
        <p>
          Social Boost AI uses the DeepSeek API to provide personalized social interaction guidance.
        </p>
      </footer>
    </div>
  );
};

export default Index;
