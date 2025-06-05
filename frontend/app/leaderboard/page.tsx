'use client';

import Link from 'next/link';
import { useState } from 'react';

interface LeaderboardUser {
  id: string;
  rank: number;
  initials: string;
  name: string;
  points: number;
  pointsChange: number;
  isCurrentUser?: boolean;
}

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState<'This Week' | 'This Month' | 'All Time'>('This Week');
  const [leaderboardData] = useState<LeaderboardUser[]>([
    {
      id: '1',
      rank: 1,
      initials: 'U1',
      name: 'User 1',
      points: 1000,
      pointsChange: 100
    },
    {
      id: '2',
      rank: 2,
      initials: 'U2',
      name: 'User 2',
      points: 900,
      pointsChange: 90
    },
    {
      id: '3',
      rank: 3,
      initials: 'U3',
      name: 'User 3',
      points: 800,
      pointsChange: 80
    },
    {
      id: '4',
      rank: 4,
      initials: 'U4',
      name: 'User 4',
      points: 700,
      pointsChange: 70
    },
    {
      id: '5',
      rank: 5,
      initials: 'U5',
      name: 'User 5',
      points: 600,
      pointsChange: 60
    },
    {
      id: '6',
      rank: 6,
      initials: 'U6',
      name: 'User 6',
      points: 500,
      pointsChange: 50
    },
    {
      id: '7',
      rank: 7,
      initials: 'U7',
      name: 'User 7',
      points: 400,
      pointsChange: 40
    },
    {
      id: '8',
      rank: 8,
      initials: 'U8',
      name: 'User 8',
      points: 300,
      pointsChange: 30
    },
    {
      id: '9',
      rank: 9,
      initials: 'U9',
      name: 'User 9',
      points: 200,
      pointsChange: 20
    },
    {
      id: '10',
      rank: 10,
      initials: 'U10',
      name: 'User 10',
      points: 100,
      pointsChange: 10
    },
    {
      id: 'current',
      rank: 15,
      initials: 'YOU',
      name: 'You',
      points: 50,
      pointsChange: 5,
      isCurrentUser: true
    }
  ]);

  // Get top 3 users for the podium
  const topThree = leaderboardData.slice(0, 3);
  // Get the rest of the users
  const otherUsers = leaderboardData.slice(3);

  return (
    <div className="flex min-h-screen bg-[#F5F9FF]">
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
          <Link href="/sdg-journey" className="flex items-center space-x-3 p-3 hover:bg-white/10 rounded-lg">
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
          <Link href="/leaderboard" className="flex items-center space-x-3 bg-white/10 p-3 rounded-lg">
            <span className="text-xl">👥</span>
            <span>Leaderboard</span>
          </Link>
          <Link href="/profile" className="flex items-center space-x-3 p-3 hover:bg-white/10 rounded-lg">
            <span className="text-xl">👤</span>
            <span>Profile</span>
          </Link>
          <Link href="/settings" className="flex items-center space-x-3 p-3 hover:bg-white/10 rounded-lg mt-auto">
            <span className="text-xl">⚙️</span>
            <span>Settings</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-[#1565C0]">Top Achievers</h1>
              <p className="text-[#1976D2] mt-1">Compete with other learners and earn rewards</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[#1976D2]">⭐</span>
                <span className="text-[#1976D2] font-medium">280 pts</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#1976D2]">📊</span>
                <span className="text-[#1976D2] font-medium">Rank 24</span>
              </div>
            </div>
          </div>

          {/* Time Period Tabs */}
          <div className="flex gap-2 mb-8">
            {(['This Week', 'This Month', 'All Time'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  activeTab === tab
                    ? 'bg-[#2196F3] text-white'
                    : 'text-[#1976D2] hover:bg-[#E3F2FD]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Top 3 Podium */}
          <div className="flex justify-center gap-4 mb-8">
            {topThree.map((user, index) => {
              const podiumColors = ['bg-[#FFD700]', 'bg-[#C0C0C0]', 'bg-[#CD7F32]'];
              const podiumOrder = [1, 0, 2]; // Display order: 2nd, 1st, 3rd
              const displayIndex = podiumOrder[index];
              
              return (
                <div 
                  key={user.id}
                  className={`flex flex-col items-center ${
                    displayIndex === 0 ? 'mt-0' : 'mt-8'
                  }`}
                >
                  <div className={`w-24 h-24 ${podiumColors[displayIndex]} rounded-lg flex items-center justify-center mb-4 relative`}>
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      {displayIndex === 0 ? '🏆' : displayIndex === 1 ? '🥈' : '🥉'}
                    </div>
                    <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center">
                      <span className="text-white text-xl font-medium">{user.initials}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-[#1565C0]">{user.name}</p>
                    <p className="text-[#1976D2] font-medium">{user.points} pts</p>
                    <p className="text-sm text-green-500">+{user.pointsChange}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Leaderboard List */}
          <div className="bg-white rounded-xl shadow-sm">
            {otherUsers.map((user) => (
              <div 
                key={user.id}
                className={`flex items-center p-4 border-b border-[#E3F2FD] last:border-b-0 ${
                  user.isCurrentUser ? 'bg-[#E3F2FD]' : ''
                }`}
              >
                <span className="w-8 text-[#1976D2] font-medium">#{user.rank}</span>
                <div className="w-10 h-10 bg-[#2196F3] rounded-full flex items-center justify-center mx-4">
                  <span className="text-white font-medium">{user.initials}</span>
                </div>
                <span className="flex-1 text-[#1565C0] font-medium">{user.name}</span>
                <div className="flex items-center gap-4">
                  <span className="text-[#1976D2] font-medium">{user.points} pts</span>
                  <span className="text-sm text-green-500">+{user.pointsChange}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 