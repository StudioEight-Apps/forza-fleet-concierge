import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowLeft, Phone, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import IOSBottomNav from '@/components/IOSBottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your Forza concierge. How can I help you with your exotic car rental today?",
      time: '12:40 pm',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    }).toLowerCase();
  };

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responses: Record<string, string> = {
        "What's the minimum age to rent?":
          "For our luxury SUVs like the Urus and Cullinan, minimum age is 25. For supercars like Ferrari and McLaren, it's 28-30 years.",
        "Do you offer delivery?":
          "Yes! Free delivery within Miami-Dade for 3+ day rentals. Airport pickup available too!",
        "What insurance do I need?":
          "$300k minimum liability for SUVs, $400-500k for supercars. We also offer add-on coverage starting at $150/day.",
      };

      const response =
        responses[text] ||
        "Sure, no problem. Have a great time! Let me know if you need anything else.";

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response,
          time: getCurrentTime(),
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-16">
      {/* iOS Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border safe-area-top">
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="h-6 w-6" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">F</span>
            </div>
            <div>
              <h1 className="font-semibold">Forza Concierge</h1>
              <p className="text-xs text-muted-foreground">Confirmed trip</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button className="p-2 rounded-full bg-primary/10">
              <Phone className="h-5 w-5 text-primary" />
            </button>
            <button className="p-2">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 pt-20 pb-20 overflow-y-auto">
        <div className="px-4 py-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-secondary text-secondary-foreground rounded-bl-sm'
                  }`}
                >
                  <p>{message.content}</p>
                </div>
                <span className="text-xs text-muted-foreground mt-1 px-1">
                  {message.time}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-start"
            >
              <div className="bg-secondary rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Quick Actions (first message only) */}
      {messages.length === 1 && (
        <div className="px-4 pb-4">
          <div className="flex flex-wrap gap-2">
            {["What's the minimum age to rent?", "Do you offer delivery?", "What insurance do I need?"].map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="bg-secondary px-3 py-2 rounded-full text-sm"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="fixed bottom-16 left-0 right-0 bg-card border-t border-border p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a message..."
            className="flex-1 bg-secondary border-0 h-11 rounded-full px-4"
          />
          <Button type="submit" size="icon" className="h-11 w-11 rounded-full">
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>

      <IOSBottomNav />
    </div>
  );
};

export default Chat;
