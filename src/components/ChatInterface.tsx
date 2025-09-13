import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { X, Send, Bot, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatInterface = ({ isOpen, onClose }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your Smart Campus Assistant. I can help you with information about schedules, facilities, dining, library services, and administrative procedures. What would you like to know?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const campusResponses = {
    schedules: "I can help you with class schedules, exam dates, and the academic calendar. What specific schedule information do you need?",
    facilities: "Our campus has various facilities including libraries, computer labs, fitness center, and student lounges. Which facility would you like to know more about?",
    dining: "The dining halls serve meals from 7 AM to 10 PM daily. Today's menu includes fresh salads, grilled entrees, and vegetarian options. Would you like specific nutrition information?",
    library: "The main library is open 24/7 during finals week, regular hours are 6 AM to midnight. You can book study rooms online through the library portal. Need help with that?",
    administration: "I can help you with enrollment forms, transcript requests, tuition payments, and academic policies. What administrative task do you need assistance with?",
    "student services": "Our student services include counseling, health center, career services, and academic advising. All services are available Monday-Friday 8 AM to 5 PM.",
    map: "I can help you navigate campus! The main buildings are connected by covered walkways. Where are you trying to go?",
    parking: "Student parking is available in lots A-F. Permits are required and can be purchased online. Visitor parking is in lot G near the main entrance.",
    default: "I'm here to help with any campus-related questions! Try asking about schedules, facilities, dining, library, or administrative services."
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const getAssistantResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('schedule') || message.includes('class') || message.includes('exam')) {
      return campusResponses.schedules;
    } else if (message.includes('facility') || message.includes('building') || message.includes('room')) {
      return campusResponses.facilities;
    } else if (message.includes('dining') || message.includes('food') || message.includes('menu') || message.includes('cafeteria')) {
      return campusResponses.dining;
    } else if (message.includes('library') || message.includes('study') || message.includes('book')) {
      return campusResponses.library;
    } else if (message.includes('admin') || message.includes('form') || message.includes('transcript') || message.includes('enrollment')) {
      return campusResponses.administration;
    } else if (message.includes('counseling') || message.includes('health') || message.includes('career') || message.includes('service')) {
      return campusResponses["student services"];
    } else if (message.includes('map') || message.includes('where') || message.includes('location')) {
      return campusResponses.map;
    } else if (message.includes('parking') || message.includes('permit')) {
      return campusResponses.parking;
    }
    
    return campusResponses.default;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAssistantResponse(inputValue),
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl h-[80vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b gradient-hero text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Campus Assistant</h3>
              <p className="text-sm text-white/80">Online • Ready to help</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 max-w-[85%]",
                  message.sender === 'user' ? "ml-auto flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                  message.sender === 'user' 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-accent text-accent-foreground"
                )}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                <div className={cn(
                  "p-3 rounded-2xl transition-smooth",
                  message.sender === 'user'
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md shadow-soft"
                )}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-muted text-foreground p-3 rounded-2xl rounded-bl-md shadow-soft">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-6 border-t bg-muted/30">
          <div className="flex gap-3">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me about campus information..."
              className="flex-1 transition-smooth focus:shadow-soft"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="px-6 transition-bounce hover:scale-105"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
            <Sparkles className="w-3 h-3" />
            <span>AI-powered campus information assistant</span>
          </div>
        </div>
      </Card>
    </div>
  );
};