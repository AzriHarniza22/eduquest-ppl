'use client';

import { useState } from 'react';
import Link from 'next/link';

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
}

interface Badge {
  name: string;
  icon: string;
  unlocked: boolean;
}

interface UserDashboard {
  name: string;
  points: number;
  badges: number;
  rank: number;
  sdgs: string;
  currentProgress: {
    percentage: number;
    currentSDG: string;
  };
  dailyChallenge: {
    title: string;
    points: number;
    streak: number;
  };
  leaderboard: LeaderboardEntry[];
  recentBadges: Badge[];
}

export default function Dashboard() {
  const user: UserDashboard = {
    name: 'Student', // Added default name for better UX
    points: 0,
    badges: 0,
    rank: 0,
    sdgs: '0/17',
    currentProgress: {
      percentage: 0,
      currentSDG: 'No SDG in progress'
    },
    dailyChallenge: {
      title: 'No active challenge',
      points: 0,
      streak: 0
    },
    leaderboard: [],
    recentBadges: []
  };

  return (
    <div className="flex min-h-screen bg-[#F5F9FF]"> {/* Lighter blue background */}
      {/* Sidebar */}
      <aside className="w-64 bg-[#2196F3] text-white p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">EduQuest</h1>
        </div>
        
        <nav className="space-y-4">
          <Link href="/dashboard" className="flex items-center space-x-3 bg-white/10 p-3 rounded-lg">
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
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-[#E3F2FD]">
          <div>
            <h1 className="text-2xl font-bold text-[#1565C0]">
              {user.name ? `Welcome back, ${user.name}! 👋` : 'Welcome to EduQuest! 👋'}
            </h1>
            <p className="text-[#1976D2] mt-2">Ready to continue your SDG learning journey?</p>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              href="/profile" 
              className="bg-white text-[#1976D2] px-4 py-2 rounded-lg border border-[#E3F2FD] hover:bg-[#F5F9FF] transition-colors flex items-center gap-2"
            >
              <span>👤</span>
              <span>Profile</span>
            </Link>
            <button className="bg-[#2196F3] text-white px-6 py-2 rounded-lg hover:bg-[#1976D2] transition-colors flex items-center gap-2">
              <span>Start Learning</span>
              <span>📚</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E3F2FD] hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-3 bg-[#E3F2FD] rounded-lg">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <span className="text-[#1976D2] block text-sm">Total Points</span>
                <span className="text-2xl font-bold text-[#1565C0]">{user.points}</span>
              </div>
            </div>
            <div className="text-[#1976D2] text-sm">Keep learning to earn more!</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E3F2FD] hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-3 bg-[#FFF3E0] rounded-lg">
                <span className="text-2xl">🏆</span>
              </div>
              <div>
                <span className="text-[#1976D2] block text-sm">Badges Earned</span>
                <span className="text-2xl font-bold text-[#1565C0]">{user.badges}</span>
              </div>
            </div>
            <div className="text-[#1976D2] text-sm">Complete tasks to earn badges!</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E3F2FD] hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-3 bg-[#E3F2FD] rounded-lg">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <span className="text-[#1976D2] block text-sm">Current Rank</span>
                <span className="text-2xl font-bold text-[#1565C0]">
                  {user.rank ? `#${user.rank}` : '-'}
                </span>
              </div>
            </div>
            <div className="text-[#1976D2] text-sm">Compete with other learners!</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E3F2FD] hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-3 bg-[#E8F5E9] rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
              <div>
                <span className="text-[#1976D2] block text-sm">SDGs Progress</span>
                <span className="text-2xl font-bold text-[#1565C0]">{user.sdgs}</span>
              </div>
            </div>
            <div className="text-[#1976D2] text-sm">Explore all 17 SDGs!</div>
          </div>
        </div>

        {/* Progress and Challenge Section */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Current Progress */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E3F2FD] hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-[#1565C0] mb-4 flex items-center gap-2">
              <span>📈</span>
              Current Progress
            </h2>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-[#1976D2] font-medium">{user.currentProgress.currentSDG}</span>
                <span className="text-[#1976D2] font-medium">{user.currentProgress.percentage}%</span>
              </div>
              <div className="w-full bg-[#E3F2FD] rounded-full h-3">
                <div 
                  className="bg-[#2196F3] h-3 rounded-full transition-all duration-500" 
                  style={{ width: `${user.currentProgress.percentage}%` }}
                ></div>
              </div>
            </div>
            {user.currentProgress.percentage === 0 && (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">🎯</div>
                <p className="text-[#1976D2] font-medium">Start your learning journey!</p>
                <p className="text-[#1976D2] text-sm mt-2">Choose an SDG to begin learning</p>
                <button className="mt-4 bg-[#2196F3] text-white px-6 py-2 rounded-lg hover:bg-[#1976D2] transition-colors">
                  Explore SDGs
                </button>
              </div>
            )}
          </div>

          {/* Daily Challenge */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E3F2FD] hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-[#1565C0] mb-4 flex items-center gap-2">
              <span>🎯</span>
              Daily Challenge
            </h2>
            {user.dailyChallenge.title === 'No active challenge' ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">🎯</div>
                <p className="text-[#1976D2] font-medium">No Active Challenges</p>
                <p className="text-[#1976D2] text-sm mt-2">Check back later for new challenges!</p>
                <button className="mt-4 bg-[#2196F3] text-white px-6 py-2 rounded-lg hover:bg-[#1976D2] transition-colors">
                  View All Challenges
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-[#1565C0]">{user.dailyChallenge.title}</p>
                  <p className="text-[#1976D2] mt-1">+ {user.dailyChallenge.points} points</p>
                  <p className="text-orange-500 flex items-center mt-2">
                    <span className="mr-1">🔥</span>
                    {user.dailyChallenge.streak} day streak
                  </p>
                </div>
                <button className="bg-[#2196F3] text-white px-6 py-2 rounded-lg hover:bg-[#1976D2] transition-colors">
                  Start Challenge
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Leaderboard and Badges Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Leaderboard */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E3F2FD] hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-[#1565C0] mb-4 flex items-center gap-2">
              <span>🏆</span>
              Leaderboard
            </h2>
            {user.leaderboard.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">🏆</div>
                <p className="text-[#1976D2] font-medium">No Rankings Yet</p>
                <p className="text-[#1976D2] text-sm mt-2">Start learning to appear on the leaderboard!</p>
                <button className="mt-4 bg-[#2196F3] text-white px-6 py-2 rounded-lg hover:bg-[#1976D2] transition-colors">
                  View Leaderboard
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {user.leaderboard.map((item) => (
                  <div key={item.rank} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#F5F9FF] transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-[#1976D2] font-medium w-8">{item.rank}</span>
                      <span className={item.name === 'You' ? 'font-semibold text-[#1565C0]' : 'text-[#1976D2]'}>{item.name}</span>
                    </div>
                    <span className="text-[#2196F3] font-medium">{item.points} pts</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Badges */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E3F2FD] hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-[#1565C0] mb-4 flex items-center gap-2">
              <span>🎖️</span>
              Recent Badges
            </h2>
            {user.recentBadges.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">🎖️</div>
                <p className="text-[#1976D2] font-medium">No Badges Yet</p>
                <p className="text-[#1976D2] text-sm mt-2">Complete challenges to earn badges!</p>
                <button className="mt-4 bg-[#2196F3] text-white px-6 py-2 rounded-lg hover:bg-[#1976D2] transition-colors">
                  View All Badges
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {user.recentBadges.map((badge, index) => (
                  <div key={index} className="text-center p-4 rounded-lg hover:bg-[#F5F9FF] transition-colors">
                    <div className={`text-4xl mb-3 ${!badge.unlocked && 'opacity-50'}`}>
                      {badge.icon}
                    </div>
                    <p className="text-sm font-medium text-[#1565C0]">{badge.name}</p>
                    {!badge.unlocked && (
                      <p className="text-xs text-[#1976D2] mt-1">Locked</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 