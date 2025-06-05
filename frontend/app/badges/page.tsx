'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Badge {
  id: string;
  title: string;
  description: string;
  points: number;
  category: 'Learning' | 'Quiz' | 'Streak' | 'Daily';
  icon: string;
  progress: number;
  earnedDate?: string;
}

export default function Badges() {
  const [activeCategory, setActiveCategory] = useState<'Badges' | 'Learning' | 'Quiz' | 'Streak' | 'Daily'>('Badges');
  const [badges] = useState<Badge[]>([
    {
      id: '1',
      title: 'Knowledge Master',
      description: 'Complete 5 learning modules',
      points: 250,
      category: 'Learning',
      icon: '📚',
      progress: 0
    },
    {
      id: '2',
      title: 'Quiz Champion',
      description: 'Score 100% on 5 quizzes',
      points: 150,
      category: 'Quiz',
      icon: '🎯',
      progress: 0
    },
    {
      id: '3',
      title: 'Dedication Star',
      description: 'Maintain a 30-day streak',
      points: 300,
      category: 'Streak',
      icon: '⭐',
      progress: 0
    },
    {
      id: '4',
      title: 'Daily Hero',
      description: 'Complete all daily tasks',
      points: 100,
      category: 'Daily',
      icon: '🌟',
      progress: 0
    },
    {
      id: '5',
      title: 'Deep Diver',
      description: 'Complete all advanced modules',
      points: 250,
      category: 'Learning',
      icon: '🤿',
      progress: 0
    },
    {
      id: '6',
      title: 'Speed Solver',
      description: 'Complete quiz under 3 minutes',
      points: 175,
      category: 'Quiz',
      icon: '⚡',
      progress: 0
    },
    {
      id: '7',
      title: 'Weekend Warrior',
      description: 'Study on 5 consecutive weekends',
      points: 150,
      category: 'Streak',
      icon: '🛡️',
      progress: 0
    },
    {
      id: '8',
      title: 'Early Bird',
      description: 'Complete tasks before 9 AM',
      points: 125,
      category: 'Daily',
      icon: '🌅',
      progress: 0
    },
    {
      id: '9',
      title: 'Resource Explorer',
      description: 'Access all learning materials',
      points: 190,
      category: 'Learning',
      icon: '🗺️',
      progress: 0
    },
    {
      id: '10',
      title: 'Perfect Score',
      description: 'Get 100% on 5 quizzes in a row',
      points: 300,
      category: 'Quiz',
      icon: '💯',
      progress: 0
    },
    {
      id: '11',
      title: 'Night Owl',
      description: 'Study for 10 nights in a row',
      points: 200,
      category: 'Streak',
      icon: '🦉',
      progress: 0
    },
    {
      id: '12',
      title: 'Task Master',
      description: 'Complete all weekly tasks',
      points: 225,
      category: 'Daily',
      icon: '✅',
      progress: 0
    },
    {
      id: '13',
      title: 'Chapter Champion',
      description: 'Master all chapter concepts',
      points: 275,
      category: 'Learning',
      icon: '📖',
      progress: 0
    },
    {
      id: '14',
      title: 'Quiz Wizard',
      description: 'Complete advanced quiz set',
      points: 350,
      category: 'Quiz',
      icon: '🧙‍♂️',
      progress: 0
    },
    {
      id: '15',
      title: 'Consistency King',
      description: 'Maintain 60-day streak',
      points: 400,
      category: 'Streak',
      icon: '👑',
      progress: 0
    },
    {
      id: '16',
      title: 'Challenge Crusher',
      description: 'Complete daily challenges',
      points: 275,
      category: 'Daily',
      icon: '💪',
      progress: 0
    }
  ]);

  // Filter badges based on active category
  const filteredBadges = activeCategory === 'Badges' 
    ? badges 
    : badges.filter(badge => badge.category === activeCategory);

  // Calculate total points and earned badges
  const totalPoints = badges.reduce((sum, badge) => sum + (badge.progress === 100 ? badge.points : 0), 0);
  const earnedBadges = badges.filter(badge => badge.progress === 100).length;

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
          <Link href="/badges" className="flex items-center space-x-3 bg-white/10 p-3 rounded-lg">
            <span className="text-xl">🏆</span>
            <span>Badges</span>
          </Link>
          <Link href="/leaderboard" className="flex items-center space-x-3 p-3 hover:bg-white/10 rounded-lg">
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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-[#1565C0]">Achievement Badges</h1>
              <p className="text-[#1976D2] mt-1">Your learning journey achievements</p>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <span className="text-[#1976D2]">✨</span>
              <span className="text-[#1976D2] font-medium">{totalPoints} Points</span>
              <span className="text-xs text-[#1976D2] opacity-75">{earnedBadges}/{badges.length} Earned</span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 mb-6 bg-white p-2 rounded-lg shadow-sm">
            {(['Badges', 'Learning', 'Quiz', 'Streak', 'Daily'] as const).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeCategory === category
                    ? 'bg-[#2196F3] text-white'
                    : 'text-[#1976D2] hover:bg-[#E3F2FD]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBadges.map((badge) => (
              <div key={badge.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#E3F2FD] rounded-lg">
                    <span className="text-2xl">{badge.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-[#1565C0]">{badge.title}</h3>
                        <p className="text-sm text-[#1976D2] mt-1">{badge.description}</p>
                      </div>
                      <span className="text-[#2196F3] font-medium">+{badge.points} pts</span>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[#1976D2]">Progress</span>
                        <span className="text-sm text-[#1976D2]">{badge.progress}%</span>
                      </div>
                      <div className="h-2 bg-[#E3F2FD] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#2196F3] rounded-full transition-all duration-500"
                          style={{ width: `${badge.progress}%` }}
                        />
                      </div>
                      {badge.earnedDate && (
                        <p className="text-xs text-[#1976D2] mt-2">
                          Earned on {new Date(badge.earnedDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 