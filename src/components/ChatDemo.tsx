import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Send, Bot, User, GraduationCap } from "lucide-react";
import ReactMarkdown from 'react-markdown';

interface Message {
  id: number;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

export function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Welcome to the Digital Lyceum! I'm here to guide you through Aristotle's profound teachings. What aspect of his philosophy would you like to explore?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleStreamingResponse = async (reader: ReadableStreamDefaultReader<Uint8Array>) => {
    let accumulatedText = '';

    const botResponse: Message = {
      id: Date.now() + 1,
      content: '',
      isBot: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);

    // First, collect all chunks
    const chunks: string[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = new TextDecoder().decode(value);
      chunks.push(chunk);
    }

    // Then display them with controlled timing
    const DISPLAY_DELAY = 30; // milliseconds between chunk displays
    for (const chunk of chunks) {
      accumulatedText += chunk;

      setMessages(prev => [
        ...prev.slice(0, -1),
        { ...botResponse, content: accumulatedText }
      ]);

      // Wait before displaying next chunk
      await new Promise(resolve => setTimeout(resolve, DISPLAY_DELAY));
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      content: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payload: inputValue }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Response body is not readable");
      }

      await handleStreamingResponse(reader);
    } catch (error) {
      console.error("Error in sendMessage:", error);
      setIsTyping(false);

      const errorMessage: Message = {
        id: Date.now() + 1,
        content: "Sorry, I encountered an error while processing your request. Please try again.",
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <Card className="w-full max-w-4xl h-[600px] flex flex-col shadow-lg">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            Aristotelian Tutor
          </h3>
          <div className="text-sm text-muted-foreground">
            Digital Lyceum • Online
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {messages.length === 1 && (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl mb-2">Welcome to the Digital Lyceum</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Begin your philosophical journey by asking any question about Aristotle's works, 
              from basic concepts to complex ethical dilemmas.
            </p>
          </div>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-2 ${
              message.isBot ? "justify-start" : "justify-end"
            }`}
          >
            {message.isBot && (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
            )}
            <div
              className={`max-w-[75%] p-3 rounded-lg ${
                message.isBot
                  ? "bg-muted text-muted-foreground"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
            {!message.isBot && (
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-secondary-foreground" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Bot className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="bg-muted p-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "0.1s"}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6 border-t flex gap-3">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask about Aristotle's teachings..."
          className="flex-1 text-base"
        />
        <Button onClick={sendMessage} size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}