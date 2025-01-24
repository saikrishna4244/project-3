import React, { useState } from 'react';
import { X, Upload, Download, Play, Settings, History, ExternalLink } from 'lucide-react';
import { FullScreenChatBot } from './FullScreenChatBot';

interface ScenarioDetailProps {
  scenario: {
    icon: React.ElementType;
    title: string;
    description: string;
    severity: string;
  };
  onClose: () => void;
}

export function ScenarioDetailView({ scenario, onClose }: ScenarioDetailProps) {
  const { icon: Icon, title, description } = scenario;
  const [showChatBot, setShowChatBot] = useState(false);

  const handleScanStart = () => {
    setShowChatBot(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#111E29] w-[80vw] h-[80vh] rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#1A2835] p-6 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center space-x-4">
            <Icon className="w-8 h-8 text-[#FF6B2C]" />
            <h2 className="text-xl font-semibold text-gray-100">{title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[#243442] rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-3 gap-6 p-6 h-[calc(80vh-88px)] overflow-y-auto">
          {/* Left Panel */}
          <div className="col-span-2 space-y-6">
            {/* Overview */}
            <div className="bg-[#1A2835] p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Overview</h3>
              <p className="text-gray-400">{description}</p>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-[#243442] p-4 rounded-lg">
                  <div className="text-[#FF6B2C] text-2xl font-bold">24</div>
                  <div className="text-sm text-gray-400">Active Threats</div>
                </div>
                <div className="bg-[#243442] p-4 rounded-lg">
                  <div className="text-[#FF6B2C] text-2xl font-bold">89%</div>
                  <div className="text-sm text-gray-400">Detection Rate</div>
                </div>
                <div className="bg-[#243442] p-4 rounded-lg">
                  <div className="text-[#FF6B2C] text-2xl font-bold">12</div>
                  <div className="text-sm text-gray-400">Resolved Today</div>
                </div>
              </div>
            </div>

            {/* Upload Section */}
            <div className="bg-[#1A2835] p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">File Analysis</h3>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-[#FF6B2C] mx-auto mb-4" />
                <p className="text-gray-400 mb-4">Drag and drop files here or click to upload</p>
                <button className="px-6 py-2 bg-[#FF6B2C] text-white rounded-lg hover:bg-opacity-90">
                  Upload Files
                </button>
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-[#1A2835] p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>
              <div className="space-y-4">
                {/* Sample result items */}
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-[#243442] p-4 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="text-gray-200">Scan Result #{item}</div>
                      <div className="text-sm text-gray-400">Completed 2 hours ago</div>
                    </div>
                    <button className="flex items-center space-x-2 text-[#FF6B2C]">
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-[#1A2835] p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={handleScanStart}
                  className="w-full p-3 bg-[#243442] hover:bg-[#2d4456] rounded-lg flex items-center space-x-3"
                >
                  <Play className="w-5 h-5 text-[#FF6B2C]" />
                  <span>Start New Scan</span>
                </button>
                <button className="w-full p-3 bg-[#243442] hover:bg-[#2d4456] rounded-lg flex items-center space-x-3">
                  <Settings className="w-5 h-5 text-[#FF6B2C]" />
                  <span>Configure Settings</span>
                </button>
                <button className="w-full p-3 bg-[#243442] hover:bg-[#2d4456] rounded-lg flex items-center space-x-3">
                  <History className="w-5 h-5 text-[#FF6B2C]" />
                  <span>View History</span>
                </button>
              </div>
            </div>

            {/* Resources */}
            <div className="bg-[#1A2835] p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <div className="space-y-3">
                {['Documentation', 'API Reference', 'Best Practices'].map((resource) => (
                  <a
                    key={resource}
                    href="#"
                    className="flex items-center justify-between p-3 bg-[#243442] hover:bg-[#2d4456] rounded-lg text-gray-300"
                  >
                    <span>{resource}</span>
                    <ExternalLink className="w-4 h-4 text-[#FF6B2C]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add ChatBot component */}
      {showChatBot && (
        <FullScreenChatBot 
          onClose={() => setShowChatBot(false)}
          onScanStart={() => console.log('Starting scan...')}
          onFileUpload={(file) => console.log('File uploaded:', file.name)}
        />
      )}
    </div>
  );
}