import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea'; // Changed from Input to Textarea
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles, Send, X, MessageSquare, CornerDownLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AiAssistantButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef(null);
  const textareaRef = useRef(null);
  const { toast } = useToast();

  const presetSuggestions = [
    "Summarize this project's goals.",
    "Break down the task 'Develop new feature X'.",
    "Suggest 3 potential deadlines for 'Q3 marketing campaign'.",
    "What are the next logical steps for 'User onboarding flow'?",
    "Draft an email to the team about project updates.",
  ];

  // Simulate API call for AI response
  const getAiResponse = async (prompt) => {
    setIsLoading(true);
    // In a real app, you'd call your GPT-4 API here.
    // For now, simulating a delay and a generic response.
    // IMPORTANT: Replace with actual Supabase Edge Function call for GPT-4
    // const { data, error } = await supabase.functions.invoke('your-gpt4-function', {
    //   body: JSON.stringify({ prompt, context: {} }) // Add relevant context
    // });
    // if (error) {
    //   toast({ title: "AI Error", description: error.message, variant: "destructive" });
    //   return "Sorry, I couldn't process that.";
    // }
    // return data.response;

    return new Promise(resolve => {
      setTimeout(() => {
        setIsLoading(false);
        resolve(`This is a simulated AI response to: "${prompt}". In a real application, this would come from a GPT-4 powered backend.`);
      }, 1500);
    });
  };

  const handleSend = async () => {
    if (inputValue.trim() === '') return;
    const userMessage = { text: inputValue, sender: 'user', id: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    const aiResponseText = await getAiResponse(userMessage.text);
    const aiMessage = { text: aiResponseText, sender: 'ai', id: Date.now() + 1 };
    setMessages(prev => [...prev, aiMessage]);
  };

  const handlePresetClick = (suggestion) => {
    setInputValue(suggestion);
    textareaRef.current?.focus();
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) viewport.scrollTop = viewport.scrollHeight;
    }
  }, [messages]);
  
  const handleTextareaKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };


  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-[100]"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
      >
        <Button
          size="lg"
          className="rounded-full shadow-2xl w-16 h-16 p-0 bg-gradient-to-br from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle AI Assistant"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className="h-7 w-7" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Sparkles className="h-7 w-7" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-[99] w-[clamp(300px,90vw,420px)] h-[clamp(400px,70vh,600px)] bg-card border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <header className="p-4 border-b flex items-center justify-between shrink-0 bg-muted/30">
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                <h3 className="font-semibold text-lg">AI Assistant</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </Button>
            </header>
            
            <ScrollArea className="flex-1" ref={scrollAreaRef}>
              <div className="p-4 space-y-4">
                {messages.length === 0 && !isLoading && (
                  <div className="text-center text-muted-foreground py-8 px-4">
                    <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-40" />
                    <p className="text-base font-medium mb-3">How can I help you today?</p>
                    <div className="space-y-2">
                      {presetSuggestions.slice(0,3).map((suggestion, i) => (
                          <Button key={i} variant="outline" size="sm" onClick={() => handlePresetClick(suggestion)} className="w-full text-left justify-start h-auto py-2 text-xs">
                              {suggestion}
                          </Button>
                      ))}
                    </div>
                  </div>
                )}
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`max-w-[85%] p-3 rounded-xl shadow-sm text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted text-foreground rounded-bl-none'}`}>
                      {msg.text.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start">
                    <div className="max-w-[85%] p-3 rounded-xl shadow-sm bg-muted text-foreground rounded-bl-none text-sm">
                      <div className="flex items-center">
                        <Sparkles className="h-4 w-4 text-primary mr-2 animate-pulse" />
                        <span>Thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            <div className="p-3 border-t bg-muted/30 shrink-0">
              <div className="relative flex items-end gap-2">
                <Textarea
                  ref={textareaRef}
                  placeholder="Ask AI anything..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleTextareaKeyDown}
                  className="py-2.5 pr-10 min-h-[44px] max-h-[120px] resize-none text-sm rounded-lg shadow-sm focus-visible:ring-primary"
                  rows={1}
                />
                <Button
                  size="icon"
                  className="h-9 w-9 shrink-0 rounded-lg bg-primary hover:bg-primary/90"
                  onClick={handleSend}
                  disabled={inputValue.trim() === '' || isLoading}
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
                <p className="text-xs text-muted-foreground mt-1.5 ml-1">Shift+Enter for new line. Enter to send.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiAssistantButton;