
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, User, SendHorizontal, Info } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const sampleResponses = [
  "Based on your portfolio's heavy tech exposure, consider adding some diversification with ETFs in other sectors like healthcare or consumer staples.",
  "I noticed you have a significant position in Tesla. Given the recent volatility in EV stocks, you might want to consider hedging with some more stable dividend-paying stocks.",
  "Your portfolio shows strong growth stocks but lacks income-generating assets. Consider adding some dividend aristocrats like JNJ or PG for stability.",
  "With your current allocation, you're quite exposed to the tech sector. Consider adding some bonds or REITs to balance your risk profile.",
  "Looking at market trends and your current holdings, you might benefit from increasing your position in semiconductors given the AI boom.",
];

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: "Hi! I'm your investment assistant. I can analyze your portfolio and provide personalized investment suggestions. How can I help you today?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: input,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate bot response (random from samples)
    setTimeout(() => {
      const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: randomResponse,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  return (
    <div className="h-[600px] flex flex-col bg-card rounded-lg shadow-sm animate-fade-in">
      <div className="p-4 border-b">
        <div className="flex items-center">
          <div className="bg-primary/10 p-2 rounded-full mr-3">
            <MessageSquare className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Investment Assistant</h3>
            <p className="text-sm text-muted-foreground">Ask for portfolio advice and investment suggestions</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <div className="flex items-start gap-3 max-w-[80%]">
            <div className="bg-primary/10 h-8 w-8 rounded-full flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-primary" />
            </div>
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex space-x-2"
        >
          <Input
            placeholder="Ask a question about your investments..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={!input.trim()}>
            <SendHorizontal className="h-4 w-4 mr-2" /> Send
          </Button>
        </form>
        <div className="mt-2 text-xs text-muted-foreground flex items-center">
          <Info className="h-3 w-3 mr-1" />
          <span>AI suggestions are for informational purposes only and not financial advice</span>
        </div>
      </div>
      
      <style jsx>{`
        .typing-indicator {
          display: flex;
          align-items: center;
          background: hsl(var(--secondary));
          padding: 12px 16px;
          border-radius: 12px;
          margin-top: 4px;
        }
        
        .typing-indicator span {
          height: 8px;
          width: 8px;
          margin: 0 2px;
          background-color: hsl(var(--muted-foreground));
          border-radius: 50%;
          display: inline-block;
          opacity: 0.4;
        }
        
        .typing-indicator span:nth-child(1) {
          animation: pulse 1s infinite 0.1s;
        }
        
        .typing-indicator span:nth-child(2) {
          animation: pulse 1s infinite 0.3s;
        }
        
        .typing-indicator span:nth-child(3) {
          animation: pulse 1s infinite 0.5s;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
};

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { type, text, timestamp } = message;
  const isUser = type === 'user';
  
  return (
    <div className={cn(
      "flex items-start gap-3 animate-slide-up",
      isUser ? "justify-end" : ""
    )}>
      {!isUser && (
        <div className="bg-primary/10 h-8 w-8 rounded-full flex items-center justify-center">
          <MessageSquare className="h-4 w-4 text-primary" />
        </div>
      )}
      
      <div className={cn(
        "py-2 px-3 rounded-lg max-w-[80%]",
        isUser 
          ? "bg-primary text-primary-foreground" 
          : "bg-secondary text-foreground"
      )}>
        <div className="text-sm">{text}</div>
        <div className="text-[10px] opacity-70 mt-1">
          {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      {isUser && (
        <div className="bg-secondary h-8 w-8 rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-foreground" />
        </div>
      )}
    </div>
  );
};

export default ChatBot;
