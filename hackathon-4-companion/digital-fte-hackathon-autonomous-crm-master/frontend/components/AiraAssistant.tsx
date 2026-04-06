"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AiraAssistantProps {
  platform: "H0" | "H1" | "H2" | "H3" | "H4";
  context: string;
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");

export function AiraAssistant({ platform, context }: AiraAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: `Greetings, Architect. I am Aira, your specialized assistant for the ${platform} platform. How can I facilitate your productivity today?` 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const assistantMsg: Message = { 
        role: "assistant", 
        content: `Analyzing ${platform} protocol... ${context}. Systems are synchronized.` 
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 10000 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            style={{
              marginBottom: "20px",
              width: "350px",
              height: "500px",
              backgroundColor: "rgba(10, 10, 15, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "28px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
            }}
          >
            {/* Header */}
            <div style={{ padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Sparkles size={18} color="#D97757" />
                <span style={{ fontSize: "11px", fontWeight: "bold", color: "white", letterSpacing: "2px" }}>AIRA — {platform} CORE</span>
              </div>
              <X size={20} color="gray" style={{ cursor: "pointer" }} onClick={() => setIsOpen(false)} />
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "15px" }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ alignSelf: msg.role === "user" ? "flex-end" : "flex-start", maxWidth: "80%" }}>
                  <div style={{
                    padding: "12px 16px",
                    borderRadius: "15px",
                    fontSize: "12px",
                    lineHeight: "1.5",
                    backgroundColor: msg.role === "user" ? "#D97757" : "rgba(255,255,255,0.05)",
                    color: "white"
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && <Loader2 size={16} color="gray" className="animate-spin" />}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{ padding: "20px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ position: "relative" }}>
                <input 
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    borderRadius: "12px",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "white",
                    fontSize: "12px"
                  }}
                  placeholder="Sync query..."
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                />
                <Send 
                  size={16} 
                  color="#D97757" 
                  style={{ position: "absolute", right: "12px", top: "12px", cursor: "pointer" }} 
                  onClick={handleSend}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "18px",
          backgroundColor: "#111",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
        }}
      >
        <MessageSquare size={24} color="white" />
      </div>
    </div>
  );
}
