import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Paperclip, Minimize2, Maximize2, X } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  onScanStart?: () => void;
  onFileUpload?: (file: File) => void;
}

export function ChatBot({ onScanStart, onFileUpload }: ChatBotProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const quickActions = [
    { label: 'Start New Scan', action: 'scan' },
    { label: 'View Reports', action: 'reports' },
    { label: 'Help', action: 'help' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: `I'll help you with "${inputText}"`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onFileUpload) {
      onFileUpload(file);
      const botResponse: Message = {
        id: Date.now(),
        text: `File "${file.name}" uploaded successfully. Starting analysis...`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }
  };

  return (
    <div className={`fixed bottom-6 right-6 ${isExpanded ? 'w-96 h-[500px]' : 'w-14 h-14'} 
      bg-[#1A2835] rounded-lg shadow-xl transition-all duration-300 overflow-hidden`}>
      
      {/* Header */}
      <div className="bg-[#243442] p-4 flex items-center justify-between">
        {isExpanded && (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-[#FF6B2C] rounded-full"></div>
            <span className="font-semibold text-gray-100">Cybersecurity Assistant</span>
          </div>
        )}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-[#2d4456] rounded-lg transition-colors"
        >
          {isExpanded ? <Minimize2 className="w-4 h-4 text-gray-400" /> : <Maximize2 className="w-4 h-4 text-gray-400" />}
        </button>
      </div>

      {isExpanded && (
        <>
          {/* Messages Area */}
          <div className="h-[calc(100%-120px)] overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-[#FF6B2C] text-white' 
                    : 'bg-[#243442] text-gray-100'
                }`}>
                  <p>{message.text}</p>
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex space-x-2 p-3 bg-[#243442] text-gray-400 rounded-lg w-16">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 flex space-x-2">
            {quickActions.map(action => (
              <button
                key={action.action}
                onClick={() => {
                  if (action.action === 'scan' && onScanStart) {
                    onScanStart();
                  }
                }}
                className="px-3 py-1 text-sm bg-[#243442] text-[#FF6B2C] rounded-lg hover:bg-[#2d4456]"
              >
                {action.label}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-[#243442] flex items-center space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 bg-[#1A2835] text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B2C]"
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 hover:bg-[#2d4456] rounded-lg transition-colors"
            >
              <Paperclip className="w-5 h-5 text-gray-400" />
            </button>
            <button
              onClick={handleSend}
              className="p-2 bg-[#FF6B2C] hover:bg-opacity-90 rounded-lg transition-colors"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
