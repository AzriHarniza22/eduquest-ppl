'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SDG {
  id: number;
  name: string;
  icon: string;
  status: 'completed' | 'available' | 'locked';
}

const sdgs: SDG[] = [
  { id: 1, name: 'No Poverty', icon: '🎯', status: 'available' },
  { id: 2, name: 'Zero Hunger', icon: '🌾', status: 'locked' },
  { id: 3, name: 'Good Health', icon: '❤️', status: 'locked' },
  { id: 4, name: 'Quality Education', icon: '📚', status: 'locked' },
  { id: 5, name: 'Gender Equality', icon: '⚖️', status: 'locked' },
  { id: 6, name: 'Clean Water', icon: '💧', status: 'locked' },
  { id: 7, name: 'Clean Energy', icon: '⚡', status: 'locked' },
  { id: 8, name: 'Decent Work', icon: '💼', status: 'locked' },
  { id: 9, name: 'Industry & Infrastructure', icon: '🏗️', status: 'locked' },
  { id: 10, name: 'Reduced Inequalities', icon: '🤝', status: 'locked' },
  { id: 11, name: 'Sustainable Cities', icon: '🏙️', status: 'locked' },
  { id: 12, name: 'Responsible Consumption', icon: '♻️', status: 'locked' },
  { id: 13, name: 'Climate Action', icon: '🌍', status: 'locked' },
  { id: 14, name: 'Life Below Water', icon: '🌊', status: 'locked' },
  { id: 15, name: 'Life on Land', icon: '🌳', status: 'locked' },
  { id: 16, name: 'Peace & Justice', icon: '☮️', status: 'locked' },
  { id: 17, name: 'Partnerships', icon: '🤝', status: 'locked' },
];

export default function SDGJourneyMap() {
  const [selectedSDG, setSelectedSDG] = useState<SDG | null>(null);
  const completedCount = sdgs.filter(sdg => sdg.status === 'completed').length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2196F3] text-white p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">EduQuest</h1>
        </div>
        
        <nav className="space-y-4">
          <Link href="/dashboard" className="flex items-center space-x-3 p-3 hover:bg-white/10 rounded-lg">
            <span className="text-xl">📊</span>
            <span>Dashboard</span>
          </Link>
          <Link href="/sdg-journey" className="flex items-center space-x-3 bg-white/10 p-3 rounded-lg">
            <span className="text-xl">🗺️</span>
            <span>SDG Journey</span>
          </Link>
          <Link href="/learn" className="flex items-center space-x-3 p-3 hover:bg-white/10 rounded-lg">
            <span className="text-xl">📚</span>
            <span>Learn</span>
          </Link>
          <Link href="/challenges" className="flex items-center space-x-3 p-3 hover:bg-white/10 rounded-lg">
            <span className="text-xl">🎯</span>
            <span>Challenges</span>
          </Link>
          <Link href="/badges" className="flex items-center space-x-3 p-3 hover:bg-white/10 rounded-lg">
            <span className="text-xl">🏆</span>
            <span>Badges</span>
          </Link>
          <Link href="/leaderboard" className="flex items-center space-x-3 p-3 hover:bg-white/10 rounded-lg">
            <span className="text-xl">👥</span>
            <span>Leaderboard</span>
          </Link>
          <Link href="/settings" className="flex items-center space-x-3 p-3 hover:bg-white/10 rounded-lg mt-auto">
            <span className="text-xl">⚙️</span>
            <span>Settings</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#1565C0]">SDG Journey Map</h1>
          <p className="text-[#1976D2]">Complete SDGs in sequence to unlock new challenges</p>
        </div>

        {/* Legend */}
        <div className="flex gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#2196F3]"></div>
            <span className="text-[#1976D2]">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#90CAF9]"></div>
            <span className="text-[#1976D2]">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#BBDEFB]"></div>
            <span className="text-[#1976D2]">Locked</span>
          </div>
        </div>

        {/* SDG Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          {sdgs.map((sdg) => (
            <button
              key={sdg.id}
              className={`p-4 rounded-xl shadow-sm flex flex-col items-center justify-center space-y-2 transition-all
                ${sdg.status === 'completed' ? 'bg-[#2196F3] text-white hover:bg-[#1976D2]' : 
                  sdg.status === 'available' ? 'bg-white border-2 border-[#2196F3] text-[#1976D2] hover:bg-blue-50' : 
                  'bg-[#F5F5F5] text-[#1976D2] cursor-not-allowed'}`}
              onClick={() => setSelectedSDG(sdg)}
              disabled={sdg.status === 'locked'}
            >
              <div className="text-3xl mb-2">{sdg.icon}</div>
              <div className="text-lg font-semibold">SDG {sdg.id}</div>
              <div className="text-sm text-center">{sdg.name}</div>
              <div className="text-xs mt-1">
                {sdg.status === 'completed' && '✅ Completed'}
                {sdg.status === 'available' && '🔓 Available'}
                {sdg.status === 'locked' && '🔒 Locked'}
              </div>
            </button>
          ))}
        </div>

        {/* Selected SDG Info */}
        {selectedSDG && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E3F2FD] mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-[#1565C0] flex items-center gap-2">
                  <span>{selectedSDG.icon}</span>
                  SDG {selectedSDG.id}: {selectedSDG.name}
                </h3>
                <p className="text-[#1976D2] mt-2">Status: {selectedSDG.status}</p>
              </div>
              {selectedSDG.status !== 'locked' && (
                <button 
                  className="bg-[#2196F3] text-white px-6 py-2 rounded-lg hover:bg-[#1976D2] transition-colors"
                  onClick={() => {/* Handle start learning */}}
                >
                  {selectedSDG.status === 'completed' ? 'Review' : 'Start Learning'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between mb-2">
            <span className="font-medium text-[#1565C0]">Journey Progress</span>
            <span className="text-[#1976D2]">{completedCount}/17 SDGs Completed</span>
          </div>
          <div className="w-full bg-[#E3F2FD] rounded-full h-2">
            <div 
              className="bg-[#2196F3] h-2 rounded-full transition-all duration-500" 
              style={{ width: `${(completedCount / 17) * 100}%` }}
            ></div>
          </div>
        </div>
      </main>
    </div>
  );
} 