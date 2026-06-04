import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Loader2, Bot, User } from "lucide-react";
import { startChat, ChatMessage } from "../services/geminiService";

export default function GeminiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize chat on first open
  useEffect(() => {
    if (isOpen && !chatRef.current) {
      const systemInstruction = "You are a helpful assistant for Studio Tactile, a high-end design studio. You are professional, concise, and creative. You help visitors understand the studio's services, portfolio, and vision.";
      chatRef.current = startChat(systemInstruction, "gemini-3-flash-preview");
    }
  }, [isOpen]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userMessage });
      const botText = response.text || "I'm sorry, I couldn't process that.";
      setMessages((prev) => [...prev, { role: "model", text: botText }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Sorry, I'm having trouble connecting right now. Please try again later." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[calc(100vw-32px)] sm:w-[350px] md:w-[400px] h-[500px] bg-[#131313] border border-[#1c1b1b] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-[#1c1b1b] flex justify-between items-center bg-[#0f0f0f]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#e03a2f] flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight">TACTILE AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] text-[#888888] font-bold uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-[#1c1b1b] rounded-full transition-colors text-[#888888] hover:text-[#f5f5f5]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-hide"
            >
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <Bot size={40} className="text-[#444444]" />
                  <p className="text-xs text-[#888888] font-medium leading-relaxed">
                    Hello! I'm the Studio Tactile assistant. How can I help you today?
                  </p>
                </div>
              )}
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#e03a2f] text-white rounded-tr-none"
                        : "bg-[#1c1b1b] text-[#e5e2e1] rounded-tl-none border border-[#2a2a2a]"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#1c1b1b] p-3 rounded-2xl rounded-tl-none border border-[#2a2a2a]">
                    <Loader2 size={16} className="animate-spin text-[#e03a2f]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[#1c1b1b] bg-[#0f0f0f]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="relative"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full bg-[#131313] border border-[#1c1b1b] rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-[#e03a2f] transition-colors placeholder:text-[#444444]"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#e03a2f] hover:text-[#f5f5f5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={18} />
                </button>
              </form>
              <p className="mt-2 text-[9px] text-center text-[#444444] font-bold uppercase tracking-widest">
                Powered by Gemini 3.0
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
          isOpen ? "bg-[#1c1b1b] text-[#f5f5f5] rotate-90" : "bg-[#e03a2f] text-white"
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
}
