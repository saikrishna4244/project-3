import React, { useState } from 'react';
import { Shield, Brush as Virus, Network, FileSearch, AlertTriangle, Lock, Radar, Database, ChevronLeft, MoreVertical } from 'lucide-react';
import { ScenarioDetailView } from './components/ScenarioDetailView';
import { Login } from './components/Login';

const scenarios = [
  {
    icon: Virus,
    title: 'Malware Analysis',
    description: 'Deep scanning and behavioral analysis',
    severity: 'high'
  },
  {
    icon: Network,
    title: 'Network Intrusion',
    description: 'Real-time traffic monitoring',
    severity: 'medium'
  },
  {
    icon: FileSearch,
    title: 'Threat Hunting',
    description: 'Proactive threat detection',
    severity: 'medium'
  },
  {
    icon: AlertTriangle,
    title: 'Incident Response',
    description: 'Automated threat mitigation',
    severity: 'high'
  },
  {
    icon: Lock,
    title: 'Access Control',
    description: 'Identity and access management',
    severity: 'low'
  },
  {
    icon: Radar,
    title: 'Vulnerability Scan',
    description: 'System weakness detection',
    severity: 'medium'
  },
  {
    icon: Database,
    title: 'Data Protection',
    description: 'Encryption and secure storage',
    severity: 'high'
  },
  {
    icon: Shield,
    title: 'Endpoint Security',
    description: 'Device protection and monitoring',
    severity: 'medium'
  }
];

function ScenarioTile({ scenario, onSelect }) {
  const { icon: Icon, title, description, severity } = scenario;

  return (
    <div 
      onClick={() => onSelect(scenario)}
      className="group relative bg-[#111E29] rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer border-l-4 border-transparent hover:border-l-4 hover:bg-[#1A2835]"
    >
      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gradient-to-r from-[#FF6B2C] to-[#FF8F5C]"></div>
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-4 rounded-full bg-[#1A2835] group-hover:bg-[#243442]">
          <Icon className="w-8 h-8 text-[#FF6B2C]" />
        </div>
        <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
        <button className="mt-4 px-4 py-2 bg-[#1A2835] text-[#FF6B2C] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          View Details
        </button>
      </div>
    </div>
  );
}

function App() {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [showFullScreenChat, setShowFullScreenChat] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A1219] text-gray-100">
      {/* Header */}
      <header className="bg-[#111E29] p-4 border-b border-gray-800">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="text-[#FF6B2C]" size={24} />
            <span className="font-bold text-xl">CyberGuard</span>
          </div>
          <nav className="flex space-x-6">
            <button className="px-4 py-2 rounded-lg bg-[#1A2835] hover:bg-[#243442]">Scenarios</button>
            <button className="px-4 py-2">Analytics</button>
            <button className="px-4 py-2">Reports</button>
            <button className="px-4 py-2">Settings</button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {/* Title Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <ChevronLeft size={24} />
            <h1 className="text-2xl font-semibold">Security Scenarios</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>System Active</span>
            </div>
            <button className="px-3 py-1 rounded bg-[#1A2835]">Filter</button>
            <MoreVertical size={20} />
          </div>
        </div>

        {/* Scenario Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scenarios.map((scenario, index) => (
            <ScenarioTile 
              key={index} 
              scenario={scenario} 
              onSelect={setSelectedScenario}
            />
          ))}
        </div>

        {/* Status Bar */}
        <div className="mt-8 bg-[#111E29] rounded-xl p-4">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>High Priority: 3</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#FF6B2C] rounded-full"></div>
                <span>Medium Priority: 4</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Low Priority: 1</span>
              </div>
            </div>
            <span>Last updated: 2 minutes ago</span>
          </div>
        </div>
      </main>
      {selectedScenario && (
        <ScenarioDetailView
          scenario={selectedScenario}
          onClose={() => setSelectedScenario(null)}
        />
      )}
      {showFullScreenChat && (
        <FullScreenChatBot 
          onClose={() => setShowFullScreenChat(false)}
          onScanStart={handleScanStart}
          onFileUpload={handleFileUpload}
        />
      )}
    </div>
  );
}export default App;