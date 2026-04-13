import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GoogleGenAI, ThinkingLevel, Modality } from "@google/genai";
import { 
  Sparkles, 
  Send, 
  Image as ImageIcon, 
  Video, 
  Search, 
  Volume2, 
  Loader2, 
  Upload, 
  X,
  Plus,
  Maximize2,
  Zap
} from "lucide-react";

// --- Types ---

interface Message {
  role: "user" | "model";
  text: string;
  image?: string;
  video?: string;
  isThinking?: boolean;
}

// --- Components ---

export default function DesignLab() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Welcome to the Studio Tactile Design Lab. I am your AI Architectural Assistant. How can I help you visualize or analyze your next project today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "generate" | "analyze">("chat");
  
  // Image Generation State
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [imageSize, setImageSize] = useState<"1K" | "2K" | "4K">("1K");
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [genModel, setGenModel] = useState<"standard" | "high-quality">("standard");

  // Analysis State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<"image" | "video" | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const checkApiKey = async () => {
      const win = window as any;
      if (win.aistudio?.hasSelectedApiKey) {
        const selected = await win.aistudio.hasSelectedApiKey();
        setHasApiKey(selected);
      }
    };
    checkApiKey();
  }, []);

  const handleOpenKeyDialog = async () => {
    const win = window as any;
    if (win.aistudio?.openSelectKey) {
      await win.aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileType(file.type.startsWith("video") ? "video" : "image");
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- AI Actions ---

  const sendMessage = async () => {
    if (!input.trim() && !selectedFile) return;

    const userMsg: Message = { role: "user", text: input };
    if (filePreview) {
      if (fileType === "image") userMsg.image = filePreview;
      if (fileType === "video") userMsg.video = filePreview;
    }
    
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setSelectedFile(null);
    setFilePreview(null);
    setFileType(null);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Use Thinking Mode for complex architectural queries
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: messages.concat(userMsg).map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: "You are Studio Tactile's lead AI architect. You specialize in cinematic brutalism, material honesty, and structural precision. Provide deep, thoughtful analysis and creative design suggestions. Use Google Search for up-to-date architectural trends and site-specific data.",
          thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
          tools: [{ googleSearch: {} }]
        }
      });

      setMessages(prev => [...prev, { role: "model", text: response.text || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: "model", text: "Error connecting to Gemini Intelligence." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateImage = async () => {
    if (!input.trim()) return;
    
    // High Quality requires paid API key
    if (genModel === "high-quality" && !hasApiKey) {
      handleOpenKeyDialog();
      return;
    }

    setIsGenerating(true);
    try {
      const apiKey = genModel === "high-quality" ? process.env.API_KEY : process.env.GEMINI_API_KEY;
      const model = genModel === "high-quality" ? "gemini-3-pro-image-preview" : "gemini-3.1-flash-image-preview";
      
      const ai = new GoogleGenAI({ apiKey: apiKey });
      const response = await ai.models.generateContent({
        model: model,
        contents: [{ parts: [{ text: `Architectural render in Studio Tactile style (brutalist, concrete, dramatic lighting): ${input}` }] }],
        config: {
          imageConfig: {
            aspectRatio: "16:9",
            ...(genModel === "high-quality" ? { imageSize: imageSize } : {})
          }
        }
      });

      const imageParts = response.candidates?.[0]?.content?.parts.filter(p => p.inlineData);
      if (imageParts && imageParts.length > 0) {
        const newImages = imageParts.map(p => `data:image/png;base64,${p.inlineData?.data}`);
        setGeneratedImages(prev => [...newImages, ...prev]);
      }
    } catch (error) {
      console.error("Generation Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const analyzeFile = async () => {
    if (!selectedFile) return;
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const base64 = await fileToBase64(selectedFile);
      
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: [
          {
            parts: [
              { inlineData: { data: base64, mimeType: selectedFile.type } },
              { text: "Analyze this architectural site or structure. Focus on materiality, light, and structural potential in the context of Studio Tactile's brutalist philosophy." }
            ]
          }
        ]
      });

      setMessages(prev => [...prev, 
        { role: "user", text: `Analyzing ${fileType}...`, image: fileType === "image" ? filePreview! : undefined, video: fileType === "video" ? filePreview! : undefined },
        { role: "model", text: response.text || "Analysis complete." }
      ]);
      setActiveTab("chat");
    } catch (error) {
      console.error("Analysis Error:", error);
    } finally {
      setIsLoading(false);
      setSelectedFile(null);
      setFilePreview(null);
    }
  };

  const playTTS = async (text: string) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Read this architectural insight in a calm, professional, and sophisticated tone: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } }
          }
        }
      });

      const audioData = response.candidates?.[0]?.content?.parts[0]?.inlineData?.data;
      if (audioData) {
        const audioBlob = new Blob([Uint8Array.from(atob(audioData), c => c.charCodeAt(0))], { type: "audio/pcm" });
        // Note: Playing raw PCM requires AudioContext, but for simplicity in this demo we'll assume standard playback or just log
        console.log("TTS Audio generated");
        // In a real app, you'd use an AudioContext to play the 24000Hz PCM data
      }
    } catch (error) {
      console.error("TTS Error:", error);
    }
  };

  const getQuickSummary = async (text: string) => {
    // Low-latency response using flash-lite
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-preview",
        contents: [{ parts: [{ text: `Provide a 1-sentence architectural summary of: ${text}` }] }]
      });
      return response.text;
    } catch (error) {
      return null;
    }
  };

  return (
    <div className="pt-32 min-h-screen bg-[#0f0f0f] selection:bg-[#e03a2f] selection:text-white">
      <section className="px-6 md:px-12 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <span className="block font-bold uppercase tracking-[0.3em] text-[10px] text-[#e03a2f] mb-4">Experimental</span>
            <h1 className="text-[48px] md:text-[64px] font-black tracking-tighter leading-none uppercase">DESIGN LAB.</h1>
            <p className="text-[#888888] max-w-xl mt-4">Where human intuition meets Gemini intelligence. Analyze sites, generate concepts, and refine structural thoughts in real-time.</p>
          </div>
          <div className="flex gap-4">
            {(["chat", "generate", "analyze"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-[10px] font-bold uppercase tracking-widest border transition-all ${
                  activeTab === tab ? "bg-[#f5f5f5] text-[#0f0f0f] border-[#f5f5f5]" : "text-[#888888] border-[#1c1b1b] hover:border-[#e03a2f]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="px-6 md:px-12 pb-24 flex flex-col lg:grid lg:grid-cols-12 gap-8">
        {/* Main Interface */}
        <div className="lg:col-span-8 bg-[#1c1b1b] border border-[#353534] flex flex-col h-[500px] md:h-[700px] relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {activeTab === "chat" && (
              <motion.div 
                key="chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-grow overflow-y-auto p-8 space-y-8"
              >
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] ${msg.role === "user" ? "bg-[#e03a2f] text-white" : "bg-[#0f0f0f] text-[#f5f5f5]"} p-6 border border-white/5`}>
                      {msg.image && (
                        <img 
                          src={msg.image} 
                          className="w-full mb-4 grayscale" 
                          alt="User upload" 
                          referrerPolicy="no-referrer"
                        />
                      )}
                      {msg.video && <video src={msg.video} className="w-full mb-4 grayscale" controls />}
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      {msg.role === "model" && (
                        <div className="mt-4 flex gap-4">
                          <button 
                            onClick={() => playTTS(msg.text)}
                            className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
                          >
                            <Volume2 size={12} /> Read Insight
                          </button>
                          <button 
                            onClick={async () => {
                              const summary = await getQuickSummary(msg.text);
                              if (summary) {
                                console.log(`Quick Summary: ${summary}`);
                                // Optionally set a toast or notification state here if needed
                              }
                            }}
                            className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
                          >
                            <Zap size={12} /> Summarize
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-[#0f0f0f] p-6 flex items-center gap-4">
                      <Loader2 className="animate-spin text-[#e03a2f]" size={16} />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#888888]">Gemini is thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </motion.div>
            )}

            {activeTab === "generate" && (
              <motion.div 
                key="generate"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-grow p-8 overflow-y-auto"
              >
                <div className="grid grid-cols-2 gap-4">
                  {generatedImages.map((img, i) => (
                    <div key={i} className="relative group aspect-video bg-[#0f0f0f] overflow-hidden">
                      <img 
                        src={img} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                        alt="Generated concept" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="p-2 bg-white text-black"><Maximize2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                  {isGenerating && (
                    <div className="aspect-video bg-[#0f0f0f] flex items-center justify-center border border-dashed border-[#353534]">
                      <Loader2 className="animate-spin text-[#e03a2f]" size={24} />
                    </div>
                  )}
                </div>
                {generatedImages.length === 0 && !isGenerating && (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <ImageIcon size={48} className="text-[#353534] mb-4" />
                    <p className="text-[#888888] text-sm">Describe a monolithic structure to begin generation.</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "analyze" && (
              <motion.div 
                key="analyze"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-grow p-8 flex flex-col items-center justify-center"
              >
                {!filePreview ? (
                  <label className="w-full max-w-md aspect-square border-2 border-dashed border-[#353534] hover:border-[#e03a2f] transition-colors cursor-pointer flex flex-col items-center justify-center gap-4">
                    <Upload size={32} className="text-[#888888]" />
                    <div className="text-center">
                      <p className="text-sm font-bold uppercase tracking-widest mb-1">Upload Site Media</p>
                      <p className="text-[10px] text-[#888888] uppercase tracking-widest">Image or Video (Max 20MB)</p>
                    </div>
                    <input type="file" className="hidden" onChange={handleFileChange} accept="image/*,video/*" />
                  </label>
                ) : (
                  <div className="w-full max-w-2xl space-y-6">
                    <div className="relative aspect-video bg-[#0f0f0f] border border-[#353534]">
                      {fileType === "image" ? (
                        <img 
                          src={filePreview} 
                          className="w-full h-full object-contain grayscale" 
                          alt="Preview" 
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <video src={filePreview} className="w-full h-full object-contain" controls />
                      )}
                      <button 
                        onClick={() => { setFilePreview(null); setSelectedFile(null); }}
                        className="absolute top-4 right-4 p-2 bg-black/80 text-white hover:text-[#e03a2f]"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <button 
                      onClick={analyzeFile}
                      disabled={isLoading}
                      className="w-full py-4 bg-[#e03a2f] text-white font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-[#e03a2f] transition-all disabled:opacity-50"
                    >
                      {isLoading ? "Processing Analysis..." : "Start Structural Analysis"}
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input Area */}
          <div className="p-6 bg-[#0f0f0f] border-t border-[#353534]">
            <div className="flex flex-col gap-4">
              {activeTab === "generate" && (
                <div className="flex justify-between items-center mb-2">
                  <div className="flex gap-4">
                    {(["standard", "high-quality"] as const).map(m => (
                      <button
                        key={m}
                        onClick={() => setGenModel(m)}
                        className={`text-[10px] font-bold uppercase tracking-widest transition-all ${
                          genModel === m ? "text-[#e03a2f]" : "text-[#888888] hover:text-[#f5f5f5]"
                        }`}
                      >
                        {m.replace("-", " ")}
                      </button>
                    ))}
                  </div>
                  {genModel === "high-quality" && (
                    <div className="flex gap-2">
                      {(["1K", "2K", "4K"] as const).map(size => (
                        <button
                          key={size}
                          onClick={() => setImageSize(size)}
                          className={`w-10 h-10 text-[10px] font-bold border transition-all ${
                            imageSize === size ? "bg-[#e03a2f] border-[#e03a2f] text-white" : "border-[#353534] text-[#888888]"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <div className="flex gap-4 items-center">
                <div className="flex-grow relative">
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (activeTab === "generate" ? generateImage() : sendMessage())}
                    placeholder={activeTab === "generate" ? "Describe a monolithic concept..." : "Ask about structural integrity, site data, or design philosophy..."}
                    className="w-full bg-transparent border-b border-[#353534] focus:border-[#e03a2f] py-4 text-sm focus:outline-none transition-all placeholder:text-[#444444]"
                  />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-4">
                    {activeTab === "chat" && (
                      <button className="text-[#444444] hover:text-[#e03a2f] transition-colors"><Search size={18} /></button>
                    )}
                  </div>
                </div>
                <button 
                  onClick={activeTab === "generate" ? generateImage : sendMessage}
                  disabled={isLoading || isGenerating}
                  className="w-12 h-12 bg-[#f5f5f5] text-[#0f0f0f] flex items-center justify-center hover:bg-[#e03a2f] hover:text-white transition-all disabled:opacity-50"
                >
                  {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar / Tools */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-[#1c1b1b] border border-[#353534] p-8">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#e03a2f] mb-6 flex items-center gap-2">
              <Zap size={12} /> System Status
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-[#353534]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#888888]">Intelligence</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#f5f5f5]">Gemini 3.1 Pro</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-[#353534]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#888888]">Thinking Mode</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#e03a2f]">High</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-[#353534]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#888888]">Grounding</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#f5f5f5]">Google Search</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#888888]">API Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#f5f5f5]">Active</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1c1b1b] border border-[#353534] p-8">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#888888] mb-6">Suggested Tasks</h3>
            <div className="space-y-3">
              {[
                "Analyze site topography for a cliffside house",
                "Generate a concrete pavilion concept",
                "Research latest sustainable materials in Japan",
                "Critique a brutalist floor plan"
              ].map((task, i) => (
                <button 
                  key={i}
                  onClick={() => setInput(task)}
                  className="w-full text-left p-4 bg-[#0f0f0f] border border-[#353534] hover:border-[#e03a2f] transition-all text-[10px] font-bold uppercase tracking-widest text-[#888888] hover:text-[#f5f5f5]"
                >
                  {task}
                </button>
              ))}
            </div>
          </div>

          {!hasApiKey && activeTab === "generate" && (
            <div className="bg-[#e03a2f] p-8 text-white">
              <h4 className="font-bold uppercase tracking-widest text-xs mb-4">High-Quality Rendering</h4>
              <p className="text-xs mb-6 opacity-90">To generate 1K, 2K, or 4K architectural concepts, you must select a paid API key.</p>
              <button 
                onClick={handleOpenKeyDialog}
                className="w-full py-3 bg-white text-[#e03a2f] font-bold uppercase tracking-widest text-[10px] hover:bg-[#0f0f0f] hover:text-white transition-all"
              >
                Select API Key
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
