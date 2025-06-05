'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Notification {
  id: string;
  type: 'achievement' | 'streak' | 'quiz' | 'module' | 'goals';
  title: string;
  message: string;
  points?: number;
  timestamp: string;
  tags: string[];
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [notifications, setNotifications] = useState<Notification[]>([]);

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
      <main className="flex-1 p-8 mt-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
              <p className="text-gray-600">Stay updated with your learning progress</p>
            </div>
            <button 
              className="text-blue-500 hover:text-blue-600 text-sm font-medium"
              onClick={() => setNotifications([])}
            >
              Mark all as read
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2 mb-6 border-b border-gray-200">
            {['All', 'Achievements', 'Learning', 'Streaks', 'System'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                  activeTab === tab 
                    ? 'text-blue-500 border-b-2 border-blue-500' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                {tab === 'All' && notifications.length > 0 && (
                  <span className="ml-2 bg-blue-100 text-blue-500 text-xs px-2 py-0.5 rounded-full">
                    {notifications.length} New
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📬</div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No New Notifications</h3>
                <p className="text-gray-600">We'll notify you when there's new activity</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-start gap-4"
                  >
                    {/* Icon based on notification type */}
                    <div className="flex-shrink-0">
                      {notification.type === 'achievement' && <span className="text-2xl">🏆</span>}
                      {notification.type === 'streak' && <span className="text-2xl">🔥</span>}
                      {notification.type === 'quiz' && <span className="text-2xl">📝</span>}
                      {notification.type === 'module' && <span className="text-2xl">📚</span>}
                      {notification.type === 'goals' && <span className="text-2xl">🎯</span>}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-800">{notification.title}</h3>
                          <p className="text-gray-600 text-sm">{notification.message}</p>
                        </div>
                        {notification.points && (
                          <span className="text-blue-500 text-sm font-medium">
                            +{notification.points} pts
                          </span>
                        )}
                      </div>

                      {/* Tags */}
                      <div className="flex gap-2 mt-2">
                        {notification.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Timestamp */}
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {notification.timestamp}
                    </span>
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