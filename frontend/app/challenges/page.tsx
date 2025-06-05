'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  sdgNumber: number;
  sdgTitle: string;
  questions: number;
  timeMinutes: number;
  points: number;
  bonus: number;
  isNew?: boolean;
}

export default function Challenges() {
  const [selectedSDG, setSelectedSDG] = useState<number>(0); // 0 means all SDGs
  const [activeTab, setActiveTab] = useState<'today' | 'previous'>('today');

  // Helper function to get SDG icon and color
  const getSDGIcon = (sdgNumber: number) => {
    switch (sdgNumber) {
      case 1:
        return '💰'; // No Poverty
      case 2:
        return '🌾'; // Zero Hunger
      case 3:
        return '🏥'; // Good Health and Well-being
      case 4:
        return '📚'; // Quality Education
      case 5:
        return '👥'; // Gender Equality
      case 6:
        return '💧'; // Clean Water and Sanitation
      case 7:
        return '⚡'; // Affordable and Clean Energy
      case 8:
        return '💼'; // Decent Work and Economic Growth
      case 9:
        return '🏭'; // Industry, Innovation and Infrastructure
      case 10:
        return '⚖️'; // Reduced Inequalities
      case 11:
        return '🏘️'; // Sustainable Cities and Communities
      case 12:
        return '♻️'; // Responsible Consumption and Production
      case 13:
        return '🌡️'; // Climate Action
      case 14:
        return '🌊'; // Life Below Water
      case 15:
        return '🌳'; // Life on Land
      case 16:
        return '⚖️'; // Peace, Justice and Strong Institutions
      case 17:
        return '🤝'; // Partnerships for the Goals
      default:
        return '🎯';
    }
  };

  // Helper function to get SDG color
  const getSDGColor = (sdgNumber: number) => {
    switch (sdgNumber) {
      case 1:
        return '#E5243B'; // SDG 1 - No Poverty
      case 2:
        return '#DDA63A'; // SDG 2 - Zero Hunger
      case 3:
        return '#4C9F38'; // SDG 3 - Good Health and Well-being
      case 4:
        return '#C5192D'; // SDG 4 - Quality Education
      case 5:
        return '#FF3A21'; // SDG 5 - Gender Equality
      case 6:
        return '#26BDE2'; // SDG 6 - Clean Water and Sanitation
      case 7:
        return '#FCC30B'; // SDG 7 - Affordable and Clean Energy
      case 8:
        return '#A21942'; // SDG 8 - Decent Work and Economic Growth
      case 9:
        return '#FD6925'; // SDG 9 - Industry, Innovation and Infrastructure
      case 10:
        return '#DD1367'; // SDG 10 - Reduced Inequalities
      case 11:
        return '#FD9D24'; // SDG 11 - Sustainable Cities and Communities
      case 12:
        return '#BF8B2E'; // SDG 12 - Responsible Consumption and Production
      case 13:
        return '#3F7E44'; // SDG 13 - Climate Action
      case 14:
        return '#0A97D9'; // SDG 14 - Life Below Water
      case 15:
        return '#56C02B'; // SDG 15 - Life on Land
      case 16:
        return '#00689D'; // SDG 16 - Peace, Justice and Strong Institutions
      case 17:
        return '#19486A'; // SDG 17 - Partnerships for the Goals
      default:
        return '#1976D2'; // Default blue
    }
  };

  const getSDGTitle = (sdgNumber: number) => {
    switch (sdgNumber) {
      case 1:
        return 'No Poverty';
      case 2:
        return 'Zero Hunger';
      case 3:
        return 'Good Health and Well-being';
      case 4:
        return 'Quality Education';
      case 5:
        return 'Gender Equality';
      case 6:
        return 'Clean Water and Sanitation';
      case 7:
        return 'Affordable and Clean Energy';
      case 8:
        return 'Decent Work and Economic Growth';
      case 9:
        return 'Industry, Innovation and Infrastructure';
      case 10:
        return 'Reduced Inequalities';
      case 11:
        return 'Sustainable Cities and Communities';
      case 12:
        return 'Responsible Consumption and Production';
      case 13:
        return 'Climate Action';
      case 14:
        return 'Life Below Water';
      case 15:
        return 'Life on Land';
      case 16:
        return 'Peace, Justice and Strong Institutions';
      case 17:
        return 'Partnerships for the Goals';
      default:
        return '';
    }
  };

  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Daily Bonus Available!',
      description: 'Complete all challenges today to earn extra points and rewards',
      sdgNumber: 0,
      sdgTitle: '',
      questions: 0,
      timeMinutes: 0,
      points: 0,
      bonus: 200,
      isNew: true
    },
    {
      id: '2',
      title: 'Poverty Indicators',
      description: 'Test your knowledge about global poverty measurements and indicators',
      sdgNumber: 1,
      sdgTitle: 'No Poverty',
      questions: 10,
      timeMinutes: 15,
      points: 150,
      bonus: 50,
      isNew: true
    },
    {
      id: '3',
      title: 'Economic Development',
      description: 'Daily challenge about economic growth and poverty reduction',
      sdgNumber: 1,
      sdgTitle: 'No Poverty',
      questions: 8,
      timeMinutes: 12,
      points: 120,
      bonus: 40,
      isNew: true
    },
    {
      id: '4',
      title: 'Food Security Systems',
      description: 'Challenge about global food security and distribution systems',
      sdgNumber: 2,
      sdgTitle: 'Zero Hunger',
      questions: 10,
      timeMinutes: 15,
      points: 150,
      bonus: 50,
      isNew: true
    },
    {
      id: '5',
      title: 'Nutrition Essentials',
      description: 'Test your knowledge about nutrition and sustainable diets',
      sdgNumber: 2,
      sdgTitle: 'Zero Hunger',
      questions: 8,
      timeMinutes: 12,
      points: 120,
      bonus: 40,
      isNew: true
    }
  ];

  // Filter challenges based on selected SDG and active tab
  const filteredChallenges = challenges.filter(challenge => 
    (selectedSDG === 0 || challenge.sdgNumber === selectedSDG)
  );

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
          <Link href="/challenges" className="flex items-center space-x-3 bg-white/10 p-3 rounded-lg">
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
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1565C0] mb-2">Challenges</h2>
            <p className="text-[#1976D2]">Complete challenges to earn points and learn about SDGs</p>
          </div>

          {/* Time Filter Tabs */}
          <div className="flex gap-4 mb-6">
            <button 
              onClick={() => setActiveTab('today')}
              className={`px-6 py-2 rounded-lg transition-colors ${
                activeTab === 'today'
                  ? 'bg-[#2196F3] text-white'
                  : 'text-[#1976D2] hover:bg-[#E3F2FD]'
              }`}
            >
              Today's Challenges
            </button>
            <button 
              onClick={() => setActiveTab('previous')}
              className={`px-6 py-2 rounded-lg transition-colors ${
                activeTab === 'previous'
                  ? 'bg-[#2196F3] text-white'
                  : 'text-[#1976D2] hover:bg-[#E3F2FD]'
              }`}
            >
              Previous Challenges
            </button>
          </div>

          {/* SDG Filter Grid */}
          <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
            <div className="grid grid-cols-6 gap-2">
              {/* All SDGs button */}
              <button 
                onClick={() => setSelectedSDG(0)}
                className={`flex flex-col items-center p-3 rounded-lg transition-all transform hover:scale-105 ${
                  selectedSDG === 0 
                    ? 'bg-[#2196F3] text-white shadow-md' 
                    : 'bg-[#E3F2FD] text-[#1976D2] hover:bg-[#1976D2] hover:text-white'
                }`}
              >
                <span className="text-2xl mb-1">🎯</span>
                <span className="text-xs font-medium">All SDGs</span>
              </button>
              
              {/* Individual SDG buttons */}
              {Array.from({ length: 17 }, (_, i) => i + 1).map((sdgNum) => (
                <button
                  key={sdgNum}
                  onClick={() => setSelectedSDG(sdgNum)}
                  style={{
                    backgroundColor: selectedSDG === sdgNum ? getSDGColor(sdgNum) : '#E3F2FD',
                    color: selectedSDG === sdgNum ? 'white' : '#1976D2',
                  }}
                  className={`flex flex-col items-center p-3 rounded-lg transition-all transform hover:scale-105 hover:shadow-md`}
                >
                  <span className="text-2xl mb-1">{getSDGIcon(sdgNum)}</span>
                  <span className="text-xs font-medium">SDG {sdgNum}</span>
                  <span className="text-[10px] text-center leading-tight mt-1 opacity-75">
                    {getSDGTitle(sdgNum)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Challenges List */}
          <div className="space-y-4">
            {filteredChallenges.map((challenge) => (
              <div 
                key={challenge.id} 
                className={`bg-white rounded-xl shadow-sm border border-[#E3F2FD] hover:shadow-md transition-shadow ${
                  challenge.id === '1' ? 'bg-[#F5F9FF]' : ''
                }`}
              >
                {challenge.id === '1' ? (
                  // Daily Bonus Card
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-[#E3F2FD] rounded-lg">
                        <span className="text-2xl">⭐</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-[#1565C0]">{challenge.title}</h3>
                        <p className="text-[#1976D2] text-sm mt-1">{challenge.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#2196F3] font-medium">+{challenge.bonus} Bonus</span>
                    </div>
                  </div>
                ) : (
                  // Regular Challenge Card
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start gap-4">
                        <div 
                          className="p-3 rounded-lg"
                          style={{ backgroundColor: getSDGColor(challenge.sdgNumber) + '20' }}
                        >
                          <span className="text-2xl">{getSDGIcon(challenge.sdgNumber)}</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-[#1565C0]">{challenge.title}</h3>
                          <p className="text-[#1976D2] text-sm mt-1">{challenge.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span 
                          className="px-3 py-1 rounded-full text-sm"
                          style={{ 
                            backgroundColor: getSDGColor(challenge.sdgNumber) + '20',
                            color: getSDGColor(challenge.sdgNumber)
                          }}
                        >
                          SDG {challenge.sdgNumber}
                        </span>
                        {challenge.isNew && (
                          <span className="bg-[#E3F2FD] text-[#1976D2] px-3 py-1 rounded-full text-sm">
                            New
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex gap-8">
                        <div className="flex items-center gap-2">
                          <span className="text-[#1976D2] text-sm">Questions</span>
                          <span className="bg-[#E3F2FD] text-[#1976D2] px-3 py-1 rounded-full text-sm">
                            {challenge.questions}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#1976D2] text-sm">Time</span>
                          <span className="bg-[#E3F2FD] text-[#1976D2] px-3 py-1 rounded-full text-sm">
                            {challenge.timeMinutes} mins
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#1976D2] text-sm">Points</span>
                          <span className="bg-[#E3F2FD] text-[#1976D2] px-3 py-1 rounded-full text-sm">
                            {challenge.points}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#1976D2] text-sm">Bonus</span>
                          <span className="bg-[#E3F2FD] text-[#1976D2] px-3 py-1 rounded-full text-sm">
                            +{challenge.bonus}
                          </span>
                        </div>
                      </div>
                      <button 
                        className="px-6 py-2 rounded-lg transition-colors"
                        style={{
                          backgroundColor: getSDGColor(challenge.sdgNumber),
                          color: 'white'
                        }}
                      >
                        Start Challenge
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 