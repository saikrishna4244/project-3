import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Mic, Paperclip, Search, ChevronLeft, Settings, Download, Play, History, Activity, AlertCircle, PieChart, BarChart2, Shield } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'file' | 'scan' | 'report';
  metadata?: any;
}

interface FullScreenChatBotProps {
  onClose: () => void;
  onScanStart?: () => void;
  onFileUpload?: (file: File) => void;
}

export function FullScreenChatBot({ onClose, onScanStart, onFileUpload }: FullScreenChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const quickActions = [
    { icon: Play, label: 'Start New Scan', action: 'scan' },
    { icon: Download, label: 'View Reports', action: 'reports' },
    { icon: Settings, label: 'Settings', action: 'settings' },
    { icon: History, label: 'History', action: 'history' }
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
        timestamp: new Date(),
        type: 'file',
        metadata: { fileName: file.name }
      };
      setMessages(prev => [...prev, botResponse]);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#111E29] z-50 flex flex-col">
      {/* Header */}
      <div className="bg-[#1A2835] p-4 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[#243442] rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-400" />
          </button>
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-[#FF6B2C]" />
            <h2 className="text-xl font-semibold text-gray-100">Cybersecurity Assistant</h2>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              className="bg-[#243442] text-gray-300 px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-[#FF6B2C]"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
          <button className="p-2 hover:bg-[#243442] rounded-lg transition-colors">
            <Settings className="w-6 h-6 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Main Content Area - Split View */}
      <div className="flex-1 flex">
        {/* Left Panel - Chat Interface */}
        <div className="w-1/2 flex flex-col border-r border-gray-800">
          {/* Quick Actions */}
          <div className="bg-[#1A2835] p-4 border-b border-gray-800">
            <div className="flex space-x-4">
              {quickActions.map(({ icon: Icon, label, action }) => (
                <button
                  key={action}
                  onClick={() => action === 'scan' && onScanStart?.()}
                  className="px-4 py-2 bg-[#243442] hover:bg-[#2d4456] rounded-lg flex items-center space-x-2 text-gray-300"
                >
                  <Icon className="w-5 h-5 text-[#FF6B2C]" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xl p-4 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-[#FF6B2C] text-white' 
                    : 'bg-[#243442] text-gray-100'
                }`}>
                  <p>{message.text}</p>
                  <span className="text-xs opacity-70 mt-2 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex space-x-2 p-4 bg-[#243442] text-gray-400 rounded-lg w-24">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-[#1A2835] p-4 border-t border-gray-800">
            <div className="flex items-center space-x-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 hover:bg-[#243442] rounded-lg transition-colors"
              >
                <Paperclip className="w-6 h-6 text-gray-400" />
              </button>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 bg-[#243442] text-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B2C]"
              />
              <button
                onClick={() => {}}
                className="p-2 hover:bg-[#243442] rounded-lg transition-colors"
              >
                <Mic className="w-6 h-6 text-gray-400" />
              </button>
              <button
                onClick={handleSend}
                className="p-3 bg-[#FF6B2C] hover:bg-opacity-90 rounded-lg transition-colors"
              >
                <Send className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Agent Activity & Results */}
        <div className="w-1/2 flex flex-col">
          {/* Agent Activity Section */}
          <div className="flex-1 p-6 border-b border-gray-800">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Activity className="w-5 h-5 text-[#FF6B2C]" />
                <h3 className="text-lg font-semibold text-gray-100">Agent Activity</h3>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-400">Active</span>
              </div>
            </div>

            {/* Activity Log */}
            <div className="space-y-4">
              {[
                { type: 'scan', status: 'in-progress', progress: 45 },
                { type: 'analysis', status: 'completed', progress: 100 },
                { type: 'monitoring', status: 'active', progress: 0 }
              ].map((activity, index) => (
                <div key={index} className="bg-[#243442] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="w-5 h-5 text-[#FF6B2C]" />
                      <span className="text-gray-200">
                        {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400">2 min ago</span>
                  </div>
                  {activity.progress > 0 && (
                    <div className="w-full bg-[#1A2835] rounded-full h-2">
                      <div 
                        className="bg-[#FF6B2C] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${activity.progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Results Section */}
          <div className="flex-1 p-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <PieChart className="w-5 h-5 text-[#FF6B2C]" />
                <h3 className="text-lg font-semibold text-gray-100">Scan Results</h3>
              </div>
              <button className="px-3 py-1 text-sm bg-[#243442] text-[#FF6B2C] rounded-lg hover:bg-[#2d4456]">
                Export Report
              </button>
            </div>

            {/* Results Summary */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#243442] p-4 rounded-lg">
                <div className="text-[#FF6B2C] text-2xl font-bold">24</div>
                <div className="text-sm text-gray-400">Threats Detected</div>
              </div>
              <div className="bg-[#243442] p-4 rounded-lg">
                <div className="text-[#FF6B2C] text-2xl font-bold">89%</div>
                <div className="text-sm text-gray-400">System Coverage</div>
              </div>
            </div>

            {/* Detailed Results */}
            <div className="space-y-4">
              {[1, 2, 3].map((result) => (
                <div key={result} className="bg-[#243442] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <div>
                        <div className="text-gray-200">Critical Vulnerability #{result}</div>
                        <div className="text-sm text-gray-400">Port 443 Exposure</div>
                      </div>
                    </div>
                    <button className="px-3 py-1 text-sm bg-[#1A2835] text-[#FF6B2C] rounded-lg hover:bg-opacity-80">
                      Take Action
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
