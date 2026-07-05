'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

export function ConciergeChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status === 'streaming' || status === 'submitted') return;
    sendMessage({ content: input, role: 'user' });
    setInput('');
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* Floating Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 rounded-full bg-gold/10 backdrop-blur-md border border-gold/30 flex items-center justify-center text-gold shadow-lg hover:bg-gold/20 hover:scale-105 transition-all z-50 group cursor-none"
          >
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-[calc(100vw-3rem)] md:w-96 h-[32rem] max-h-[80vh] bg-ink/90 backdrop-blur-xl border border-gold/20 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden cursor-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gold/10 bg-glass-dark">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-ivory text-lg">Digital Concierge</h3>
                  <p className="font-sans text-[9px] uppercase tracking-widest text-gold">Always at your service</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-ivory/50 hover:text-ivory transition-colors p-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar relative">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <Sparkles className="w-8 h-8 text-gold mb-4 opacity-50" />
                  <p className="font-serif text-ivory text-xl mb-2">Welcome to Vilasa.</p>
                  <p className="font-sans text-xs text-ivory/70 max-w-[200px]">
                    How may I assist you with your stay today?
                  </p>
                </div>
              ) : (
                messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-2xl font-sans text-sm leading-relaxed
                        ${m.role === 'user' 
                          ? 'bg-gold text-ink rounded-tr-sm' 
                          : 'bg-glass-dark text-ivory border border-gold/10 rounded-tl-sm'
                        }`}
                    >
                      {m.content}
                    </div>
                  </motion.div>
                ))
              )}
              {(status === 'streaming' || status === 'submitted') && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-glass-dark px-4 py-3 rounded-2xl rounded-tl-sm border border-gold/10 flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/50 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/50 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/50 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gold/10 bg-glass-dark">
              <form onSubmit={handleFormSubmit} className="relative flex items-center">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full bg-ink/50 border border-gold/20 rounded-full py-3 pl-5 pr-12 text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === 'streaming' || status === 'submitted' || !input.trim()}
                  className="absolute right-2 p-2 text-gold hover:text-ivory disabled:opacity-50 transition-colors bg-ink rounded-full"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
