'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Module {
  id: number;
  sdgId: number;
  title: string;
  description: string;
  duration: string;
  progress: number;
  status: 'locked' | 'available' | 'completed';
  topics: string[];
}

const learningModules: Module[] = [
  {
    id: 1,
    sdgId: 1,
    title: "Introduction to SDG 1: No Poverty",
    description: "Learn about the first Sustainable Development Goal and understand the global challenge of poverty.",
    duration: "30 mins",
    progress: 0,
    status: 'available',
    topics: ['Understanding Poverty', 'Global Poverty Statistics', 'Impact on Communities', 'Solutions and Actions']
  },
  {
    id: 2,
    sdgId: 2,
    title: "Understanding Zero Hunger",
    description: "Explore the second SDG and its mission to end hunger and achieve food security.",
    duration: "45 mins",
    progress: 0,
    status: 'locked',
    topics: ['Food Security', 'Sustainable Agriculture', 'Nutrition', 'Food Distribution']
  },
  {
    id: 3,
    sdgId: 3,
    title: "Health and Well-being",
    description: "Discover the importance of good health and well-being in sustainable development.",
    duration: "40 mins",
    progress: 0,
    status: 'locked',
    topics: ['Global Health', 'Healthcare Access', 'Disease Prevention', 'Mental Health']
  },
  {
    id: 4,
    sdgId: 4, 
    title: "Quality Education for All",
    description: "Learn about ensuring inclusive and equitable quality education.",
    duration: "35 mins",
    progress: 0,
    status: 'locked',
    topics: ['Education Access', 'Learning Quality', 'Digital Education', 'Lifelong Learning']
  },
  {
    id: 5,
    sdgId: 5,
    title: "Gender Equality",
    description: "Understand the importance of achieving gender equality and empowering all women and girls.",
    duration: "35 mins",
    progress: 0,
    status: 'locked',
    topics: ['Women Empowerment', 'Equal Rights', 'Gender-based Violence', 'Economic Equality']
  },
  {
    id: 6,
    sdgId: 6,
    title: "Clean Water and Sanitation",
    description: "Learn about ensuring availability and sustainable management of water and sanitation for all.",
    duration: "40 mins",
    progress: 0,
    status: 'locked',
    topics: ['Water Access', 'Sanitation Systems', 'Water Conservation', 'Ecosystem Protection']
  },
  {
    id: 7,
    sdgId: 7,
    title: "Affordable and Clean Energy",
    description: "Explore sustainable and modern energy solutions for all.",
    duration: "45 mins",
    progress: 0,
    status: 'locked',
    topics: ['Renewable Energy', 'Energy Efficiency', 'Clean Technology', 'Energy Access']
  },
  {
    id: 8,
    sdgId: 8,
    title: "Decent Work and Economic Growth",
    description: "Understand sustainable economic growth and decent work opportunities.",
    duration: "40 mins",
    progress: 0,
    status: 'locked',
    topics: ['Economic Development', 'Job Creation', 'Labor Rights', 'Sustainable Growth']
  },
  {
    id: 9,
    sdgId: 9,
    title: "Industry, Innovation and Infrastructure",
    description: "Learn about building resilient infrastructure and fostering innovation.",
    duration: "45 mins",
    progress: 0,
    status: 'locked',
    topics: ['Infrastructure Development', 'Industrial Growth', 'Technology Innovation', 'Sustainable Industrialization']
  },
  {
    id: 10,
    sdgId: 10,
    title: "Reduced Inequalities",
    description: "Explore ways to reduce inequality within and among countries.",
    duration: "35 mins",
    progress: 0,
    status: 'locked',
    topics: ['Social Inclusion', 'Economic Equality', 'Policy Making', 'Global Partnership']
  },
  {
    id: 11,
    sdgId: 11,
    title: "Sustainable Cities and Communities",
    description: "Learn about making cities inclusive, safe, resilient and sustainable.",
    duration: "40 mins",
    progress: 0,
    status: 'locked',
    topics: ['Urban Planning', 'Public Spaces', 'Sustainable Transport', 'Community Development']
  },
  {
    id: 12,
    sdgId: 12,
    title: "Responsible Consumption and Production",
    description: "Understand sustainable consumption and production patterns.",
    duration: "35 mins",
    progress: 0,
    status: 'locked',
    topics: ['Resource Efficiency', 'Waste Reduction', 'Sustainable Practices', 'Consumer Awareness']
  },
  {
    id: 13,
    sdgId: 13,
    title: "Climate Action",
    description: "Take urgent action to combat climate change and its impacts.",
    duration: "45 mins",
    progress: 0,
    status: 'locked',
    topics: ['Climate Science', 'Environmental Impact', 'Mitigation Strategies', 'Adaptation Plans']
  },
  {
    id: 14,
    sdgId: 14,
    title: "Life Below Water",
    description: "Learn about conserving and sustainably using marine resources.",
    duration: "40 mins",
    progress: 0,
    status: 'locked',
    topics: ['Marine Ecosystems', 'Ocean Conservation', 'Sustainable Fishing', 'Pollution Prevention']
  },
  {
    id: 15,
    sdgId: 15,
    title: "Life on Land",
    description: "Explore protecting and restoring terrestrial ecosystems.",
    duration: "40 mins",
    progress: 0,
    status: 'locked',
    topics: ['Biodiversity', 'Forest Conservation', 'Land Degradation', 'Wildlife Protection']
  },
  {
    id: 16,
    sdgId: 16,
    title: "Peace, Justice and Strong Institutions",
    description: "Understand the importance of peaceful and inclusive societies.",
    duration: "45 mins",
    progress: 0,
    status: 'locked',
    topics: ['Peace Building', 'Justice Systems', 'Good Governance', 'Anti-corruption']
  },
  {
    id: 17,
    sdgId: 17,
    title: "Partnerships for the Goals",
    description: "Learn about strengthening global partnerships for sustainable development.",
    duration: "35 mins",
    progress: 0,
    status: 'locked',
    topics: ['Global Cooperation', 'Resource Mobilization', 'Technology Transfer', 'Capacity Building']
  }
];

export default function LearnPage() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const router = useRouter();

  // FUNGSI YANG DIPERBAIKI - sekarang menggunakan sdgId untuk redirect ke lesson
  const handleStartLearning = async (moduleId: number, sdgId: number) => {
    try {
      // 1. Start SDG jika belum dimulai (opsional)
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const response = await fetch('/api/sdgs/start', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sdgId })
          });

          if (!response.ok) {
            console.log('SDG sudah dimulai sebelumnya atau terjadi error');
          }
        } catch (error) {
          console.error('Error starting SDG:', error);
        }
      }

      // 2. Navigate ke halaman lesson berdasarkan SDG ID
      router.push(`/lessons/sdg/${sdgId}`);
      
    } catch (error) {
      console.error('Error in handleStartLearning:', error);
      // Tetap navigate meskipun ada error
      router.push(`/lessons/sdg/${sdgId}`);
    }
  };

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
          <Link href="/learn" className="flex items-center space-x-3 bg-white/10 p-3 rounded-lg">
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
      <main className="flex-1 p-8 space-y-8">
        {/* Header Section */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Learning Modules</h1>
          <p className="text-gray-600 max-w-2xl">Start your journey through the Sustainable Development Goals. Each module contains interactive lessons, quizzes, and real-world examples to help you understand and contribute to global sustainability.</p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">0/4</div>
              <div className="text-sm text-gray-600">Modules Completed</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">1</div>
              <div className="text-sm text-gray-600">Available Modules</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">0</div>
              <div className="text-sm text-gray-600">Points Earned</div>
            </div>
          </div>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {learningModules.map((module) => (
            <div
              key={module.id}
              className={`p-6 rounded-xl shadow-sm transition-all ${
                module.status === 'locked'
                  ? 'bg-gray-50 border border-gray-200 cursor-not-allowed'
                  : module.status === 'completed'
                  ? 'bg-white border-2 border-blue-500 hover:shadow-lg'
                  : 'bg-white border border-gray-100 hover:shadow-lg cursor-pointer'
              }`}
              onClick={() => module.status !== 'locked' && setSelectedModule(module)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{module.id <= 4 ? ['🎯', '🌾', '❤️', '📚'][module.id - 1] : '📖'}</span>
                  <h3 className="text-lg font-semibold text-gray-800">{module.title}</h3>
                </div>
                <span className="flex items-center text-sm text-gray-500">
                  <span className="mr-2">⏱️</span>
                  {module.duration}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{module.description}</p>
              
              {/* Topics List */}
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Topics covered:</div>
                <div className="flex flex-wrap gap-2">
                  {module.topics.map((topic, index) => (
                    <span 
                      key={index}
                      className={`text-xs px-2 py-1 rounded-full ${
                        module.status === 'locked'
                          ? 'bg-gray-100 text-gray-500'
                          : 'bg-blue-50 text-blue-600'
                      }`}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center text-sm ${
                    module.status === 'locked' ? 'text-gray-500' :
                    module.status === 'completed' ? 'text-blue-500' :
                    'text-green-500'
                  }`}>
                    <span className="mr-1">
                      {module.status === 'locked' ? '🔒' :
                       module.status === 'completed' ? '✅' :
                       '🔓'}
                    </span>
                    {module.status.charAt(0).toUpperCase() + module.status.slice(1)}
                  </span>
                </div>
                {module.status !== 'locked' && (
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      module.status === 'completed'
                        ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click
                      handleStartLearning(module.id, module.sdgId); // MENGGUNAKAN sdgId
                    }}
                  >
                    {module.status === 'completed' ? 'Review Module' : 'Start Learning'}
                  </button>
                )}
              </div>

              {/* Progress Bar for non-locked modules */}
              {module.status !== 'locked' && (
                <div className="mt-4">
                  <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all"
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">{module.progress}% Complete</span>
                    <span className="text-xs text-gray-500">{module.topics.length} Topics</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Selected Module Details */}
        {selectedModule && (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-3xl">
                    {selectedModule.id <= 4 ? ['🎯', '🌾', '❤️', '📚'][selectedModule.id - 1] : '📖'}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedModule.title}</h2>
                </div>
                <p className="text-gray-600 max-w-2xl">{selectedModule.description}</p>
              </div>
              <div className="flex items-center space-x-2 text-gray-500">
                <span>⏱️</span>
                <span>{selectedModule.duration}</span>
              </div>
            </div>

            {/* Topics Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {selectedModule.topics.map((topic, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-gray-800">{topic}</div>
                  <div className="text-xs text-gray-500 mt-1">Not started</div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all"
                    style={{ width: `${selectedModule.progress}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600">{selectedModule.progress}% Complete</span>
              </div>
              <button
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => handleStartLearning(selectedModule.id, selectedModule.sdgId)}
              >
                Start Learning
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}