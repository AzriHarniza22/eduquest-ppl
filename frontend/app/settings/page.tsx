'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Settings() {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('medium');
  const [highContrast, setHighContrast] = useState(false);
  const [language, setLanguage] = useState('English');
  const [compactView, setCompactView] = useState(false);
  const [showTips, setShowTips] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [autoPlayVideos, setAutoPlayVideos] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState('Slow');

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
          <Link href="/settings" className="flex items-center space-x-3 bg-white/10 p-3 rounded-lg">
            <span className="text-xl">⚙️</span>
            <span>Settings</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#1565C0]">Settings</h1>
            <p className="text-[#1976D2] mt-1">Customize your app experience</p>
          </div>

          {/* Settings Sections */}
          <div className="space-y-8">
            {/* Display Section */}
            <section>
              <h2 className="text-lg font-semibold text-[#1565C0] mb-4">Display</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[#1565C0] mb-2">Theme</label>
                  <select 
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full p-2 rounded-lg border border-[#2196F3] bg-white text-[#1976D2]"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-[#1565C0] mb-2">Font Size</label>
                  <select 
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className="w-full p-2 rounded-lg border border-[#2196F3] bg-white text-[#1976D2]"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm text-[#1565C0]">High Contrast</label>
                    <p className="text-sm text-[#1976D2]">Increase text contrast for better readability</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={highContrast}
                      onChange={(e) => setHighContrast(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#E3F2FD] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#2196F3] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2196F3]"></div>
                  </label>
                </div>
              </div>
            </section>

            {/* Language Section */}
            <section>
              <h2 className="text-lg font-semibold text-[#1565C0] mb-4">Language</h2>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-2 rounded-lg border border-[#2196F3] bg-white text-[#1976D2]"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            </section>

            {/* Interface Section */}
            <section>
              <h2 className="text-lg font-semibold text-[#1565C0] mb-4">Interface</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm text-[#1565C0]">Compact View</label>
                    <p className="text-sm text-[#1976D2]">Show more content with less spacing</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={compactView}
                      onChange={(e) => setCompactView(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#E3F2FD] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#2196F3] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2196F3]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm text-[#1565C0]">Show Tips</label>
                    <p className="text-sm text-[#1976D2]">Display helpful tips while learning</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showTips}
                      onChange={(e) => setShowTips(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#E3F2FD] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#2196F3] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2196F3]"></div>
                  </label>
                </div>
              </div>
            </section>

            {/* Media Section */}
            <section>
              <h2 className="text-lg font-semibold text-[#1565C0] mb-4">Media</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm text-[#1565C0]">Sound Effects</label>
                    <p className="text-sm text-[#1976D2]">Play sounds for actions and achievements</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={soundEffects}
                      onChange={(e) => setSoundEffects(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#E3F2FD] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#2196F3] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2196F3]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm text-[#1565C0]">Auto-Play Videos</label>
                    <p className="text-sm text-[#1976D2]">Automatically play video content</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoPlayVideos}
                      onChange={(e) => setAutoPlayVideos(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#E3F2FD] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#2196F3] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2196F3]"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm text-[#1565C0] mb-2">Animation Speed</label>
                  <select 
                    value={animationSpeed}
                    onChange={(e) => setAnimationSpeed(e.target.value)}
                    className="w-full p-2 rounded-lg border border-[#2196F3] bg-white text-[#1976D2]"
                  >
                    <option value="Slow">Slow</option>
                    <option value="Normal">Normal</option>
                    <option value="Fast">Fast</option>
                  </select>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
} 