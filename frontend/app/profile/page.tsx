'use client';

import Link from 'next/link';

interface ProfileStats {
  totalPoints: number;
  dayStreak: number;
  hoursLearned: number;
  modules: number;
  quizzes: number;
  avgScore: number;
  bestStreak: number;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  earnedDate: string;
}

interface Activity {
  id: string;
  type: string;
  title: string;
  points?: number;
  timestamp: string;
}

export default function Profile() {
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
          <Link href="/leaderboard" className="flex items-center space-x-3 p-3 hover:bg-white/10 rounded-lg">
            <span className="text-xl">👥</span>
            <span>Leaderboard</span>
          </Link>
          <Link href="/profile" className="flex items-center space-x-3 bg-white/10 p-3 rounded-lg">
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
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-[#2196F3] to-[#1565C0] text-white p-8 rounded-xl mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl">
                👤
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">Profile</h1>
                <p className="text-blue-100">Member since {new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <button className="bg-white text-[#1565C0] px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Level Progress */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E3F2FD] mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#1565C0]">Level Progress</h2>
            <span className="bg-[#E3F2FD] text-[#1565C0] px-3 py-1 rounded-full text-sm font-medium">
              Level 0
            </span>
          </div>
          <div className="w-full bg-[#E3F2FD] rounded-full h-3 mb-4">
            <div className="bg-[#2196F3] h-3 rounded-full" style={{ width: '0%' }}></div>
          </div>
          <div className="flex justify-between text-sm text-[#1976D2]">
            <span>0 XP</span>
            <span>Next: Level 1</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E3F2FD]">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🎯</span>
              <span className="text-[#1976D2]">Total Points</span>
            </div>
            <div className="text-2xl font-bold text-[#1565C0]">0</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E3F2FD]">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🔥</span>
              <span className="text-[#1976D2]">Day Streak</span>
            </div>
            <div className="text-2xl font-bold text-[#1565C0]">0</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E3F2FD]">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">⏱️</span>
              <span className="text-[#1976D2]">Hours Learned</span>
            </div>
            <div className="text-2xl font-bold text-[#1565C0]">0</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E3F2FD]">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">📚</span>
              <span className="text-[#1976D2]">Modules</span>
            </div>
            <div className="text-2xl font-bold text-[#1565C0]">0</div>
          </div>
        </div>

        {/* Recent Activity and Badges */}
        <div className="grid grid-cols-2 gap-6">
          {/* Recent Badges */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E3F2FD]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#1565C0]">Recent Badges</h2>
              <Link href="/badges" className="text-[#2196F3] hover:text-[#1976D2] transition-colors">
                View All
              </Link>
            </div>
            <div className="text-center py-8">
              <div className="text-4xl mb-3">🏆</div>
              <p className="text-[#1976D2] font-medium">No Badges Yet</p>
              <p className="text-[#1976D2] text-sm mt-2">Complete challenges to earn badges!</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E3F2FD]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#1565C0]">Recent Activity</h2>
              <Link href="/activity" className="text-[#2196F3] hover:text-[#1976D2] transition-colors">
                View All
              </Link>
            </div>
            <div className="text-center py-8">
              <div className="text-4xl mb-3">📋</div>
              <p className="text-[#1976D2] font-medium">No Recent Activity</p>
              <p className="text-[#1976D2] text-sm mt-2">Start learning to track your progress!</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 