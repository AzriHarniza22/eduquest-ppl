'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Target, 
  Star,
  ArrowRight,
  ArrowLeft,
  Volume2,
  VolumeX,
  Maximize,
  Eye,
  Award,
  Zap,
  Heart,
  Timer,
  Trophy,
  Lightbulb
} from 'lucide-react';

// Type definitions
interface LessonContent {
  type: string;
  title: string;
  data: string;
  order: number;
}

interface LessonData {
  sdgId: number;
  title: string;
  description: string;
  content: LessonContent[];
  videoUrl: string;
  duration: number;
  objectives: string[];
  difficulty: string;
  tags: string[];
}

const InteractiveLessonPage = () => {
  // State Management with proper types
  const [lessonData, setLessonData] = useState<LessonData | null>(null);
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const [showMotivation, setShowMotivation] = useState<boolean>(false);
  const [readingSpeed, setReadingSpeed] = useState<number>(200); // words per minute
  const [estimatedReadTime, setEstimatedReadTime] = useState<number>(0);
  const [isNightMode, setIsNightMode] = useState<boolean>(false);
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const [userNotes, setUserNotes] = useState<string>('');
  const [highlightedText, setHighlightedText] = useState<string[]>([]);
  const [streak, setStreak] = useState<number>(0);
  const [xpGained, setXpGained] = useState<number>(0);

  const videoRef = useRef<HTMLIFrameElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Sample Data (replace with API call)
  const sampleLessonData: LessonData = {
    sdgId: 1,
    title: "No Poverty - Building Sustainable Communities",
    description: "Explore the root causes of poverty and discover innovative solutions for building sustainable, inclusive communities worldwide.",
    content: [
      {
        type: "text",
        title: "Understanding Global Poverty",
        data: "Poverty affects over 700 million people worldwide, living on less than $2.15 per day. This complex issue stems from various interconnected factors including lack of education, limited access to healthcare, economic instability, and social inequality. Understanding these root causes is the first step toward creating effective solutions.",
        order: 1
      },
      {
        type: "video",
        title: "Success Stories: Communities Rising Above Poverty",
        data: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        order: 2
      },
      {
        type: "text",
        title: "Innovation in Poverty Alleviation",
        data: "Modern approaches to poverty reduction include microfinance, sustainable agriculture, renewable energy access, and digital inclusion programs. These solutions focus on empowering communities to create their own sustainable pathways out of poverty, rather than relying solely on aid.",
        order: 3
      },
      {
        type: "text",
        title: "Your Role in Creating Change",
        data: "Every individual can contribute to poverty alleviation through various means: supporting ethical businesses, volunteering with local organizations, advocating for policy changes, or simply spreading awareness. Small actions, when multiplied across communities, create significant impact.",
        order: 4
      }
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: 25,
    objectives: [
      "Understand the root causes of global poverty",
      "Identify innovative solutions for poverty alleviation",
      "Recognize your role in creating positive change",
      "Develop empathy and global awareness"
    ],
    difficulty: "beginner",
    tags: ["poverty", "sustainability", "social impact", "community development"]
  };

  // Timer Effect
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Initialize lesson data
  useEffect(() => {
    setLessonData(sampleLessonData);
    calculateReadingTime(sampleLessonData.content[0]?.data || '');
  }, []);

  // Calculate reading time
  const calculateReadingTime = (text: string): void => {
    const wordCount = text.split(' ').length;
    const minutes = Math.ceil(wordCount / readingSpeed);
    setEstimatedReadTime(minutes);
  };

  // Handle section completion
  const markSectionComplete = (sectionIndex: number): void => {
    if (!completedSections.includes(sectionIndex)) {
      const newCompleted = [...completedSections, sectionIndex];
      setCompletedSections(newCompleted);
      if (lessonData) {
        setProgress(Math.round((newCompleted.length / lessonData.content.length) * 100));
      }
      setXpGained(prev => prev + 10);
      
      // Show motivation animation
      setShowMotivation(true);
      setTimeout(() => setShowMotivation(false), 2000);
    }
  };

  // Navigation functions
  const goToNextSection = (): void => {
    if (lessonData && currentSection < lessonData.content.length - 1) {
      markSectionComplete(currentSection);
      setCurrentSection(prev => prev + 1);
      calculateReadingTime(lessonData.content[currentSection + 1]?.data || '');
      sectionRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevSection = (): void => {
    if (lessonData && currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      calculateReadingTime(lessonData.content[currentSection - 1]?.data || '');
      sectionRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Video controls
  const toggleVideo = (): void => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        // Note: iframe doesn't have pause method, this is just for UI state
        console.log('Pausing video');
      } else {
        // Note: iframe doesn't have play method, this is just for UI state
        console.log('Playing video');
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = (): void => {
    if (videoRef.current) {
      // Note: iframe doesn't have muted property, this is just for UI state
      setIsVideoMuted(!isVideoMuted);
    }
  };

  // Format time display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Complete lesson
  const completeLesson = (): void => {
    markSectionComplete(currentSection);
    setStreak(prev => prev + 1);
    setXpGained(prev => prev + 50);
    alert('🎉 Congratulations! You completed the lesson. Ready for the quiz?');
    // Navigate to quiz
    if (lessonData) {
      window.location.href = `/quiz?sdg=${lessonData.sdgId}`;
    }
  };

  if (!lessonData) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>
  );

  const currentContent = lessonData.content[currentSection];

  return (
    <div className={`min-h-screen transition-all duration-300 ${isNightMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
      
      {/* Motivation Animation */}
      {showMotivation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="animate-bounce">
            <div className="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2">
              <Star className="w-6 h-6 animate-spin" />
              <span className="font-bold">Great Progress! +10 XP</span>
              <Trophy className="w-6 h-6" />
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className={`sticky top-0 z-40 backdrop-blur-md ${isNightMode ? 'bg-gray-800/80' : 'bg-white/80'} border-b shadow-sm`}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-bold">SDG {lessonData.sdgId}: {lessonData.title}</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Stats */}
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Timer className="w-4 h-4 text-orange-500" />
                  <span>{formatTime(timeSpent)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span>{xpGained} XP</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>{streak} Streak</span>
                </div>
              </div>

              {/* Controls */}
              <button
                onClick={() => setIsNightMode(!isNightMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {isNightMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Progress: {progress}%</span>
              <span>{completedSections.length} of {lessonData.content.length} sections completed</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className={`sticky top-32 space-y-6 ${isNightMode ? 'text-gray-200' : ''}`}>
              
              {/* Learning Objectives */}
              <div className={`p-6 rounded-xl shadow-lg ${isNightMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center space-x-2 mb-4">
                  <Target className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold">Learning Objectives</h3>
                </div>
                <ul className="space-y-2">
                  {lessonData.objectives.map((objective: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section Navigation */}
              <div className={`p-6 rounded-xl shadow-lg ${isNightMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className="font-semibold mb-4">Sections</h3>
                <div className="space-y-2">
                  {lessonData.content.map((section: LessonContent, index: number) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentSection(index);
                        calculateReadingTime(section.data || '');
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        currentSection === index
                          ? 'bg-blue-500 text-white shadow-md'
                          : completedSections.includes(index)
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{section.title}</span>
                        {completedSections.includes(index) && (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Reading Stats */}
              <div className={`p-6 rounded-xl shadow-lg ${isNightMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold">Reading Stats</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Est. Reading Time:</span>
                    <span className="font-medium">{estimatedReadTime} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Spent:</span>
                    <span className="font-medium">{formatTime(timeSpent)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reading Speed:</span>
                    <span className="font-medium">{readingSpeed} wpm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div 
              ref={sectionRef}
              className={`p-8 rounded-xl shadow-lg min-h-[600px] ${isNightMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              
              {/* Section Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full font-bold">
                      {currentSection + 1}
                    </div>
                    <h2 className="text-2xl font-bold">{currentContent.title}</h2>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {currentContent.type === 'text' && (
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Eye className="w-4 h-4" />
                        <span>{estimatedReadTime} min read</span>
                      </div>
                    )}
                    <button
                      onClick={() => setShowNotes(!showNotes)}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      📝
                    </button>
                  </div>
                </div>
                
                {/* Progress for current section */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentSection + 1) / lessonData.content.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Content Display */}
              <div className="mb-8">
                {currentContent.type === 'text' ? (
                  <div className="prose prose-lg max-w-none">
                    <p className="text-lg leading-relaxed mb-6 text-justify">
                      {currentContent.data}
                    </p>
                    
                    {/* Interactive Elements */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="flex items-center space-x-2 mb-3">
                          <Lightbulb className="w-5 h-5 text-yellow-500" />
                          <h4 className="font-semibold">Key Insight</h4>
                        </div>
                        <p className="text-sm">
                          Understanding the interconnected nature of poverty helps us develop more effective, holistic solutions.
                        </p>
                      </div>
                      
                      <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="flex items-center space-x-2 mb-3">
                          <Award className="w-5 h-5 text-green-500" />
                          <h4 className="font-semibold">Did You Know?</h4>
                        </div>
                        <p className="text-sm">
                          Microfinance has helped over 140 million people worldwide access financial services.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : currentContent.type === 'video' ? (
                  <div className="relative">
                    <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                      <iframe
                        ref={videoRef}
                        src={currentContent.data}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    
                    {/* Video Controls */}
                    <div className="flex items-center justify-between mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={toggleVideo}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          <span>{isVideoPlaying ? 'Pause' : 'Play'}</span>
                        </button>
                        
                        <button
                          onClick={toggleMute}
                          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          {isVideoMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>
                      </div>
                      
                      <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        <Maximize className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Notes Section */}
              {showNotes && (
                <div className="mb-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h4 className="font-semibold mb-3">Your Notes</h4>
                  <textarea
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                    placeholder="Write your thoughts, questions, or key takeaways..."
                    className="w-full h-24 p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-8 border-t">
                <button
                  onClick={goToPrevSection}
                  disabled={currentSection === 0}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    currentSection === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center space-x-4">
                  {!completedSections.includes(currentSection) && (
                    <button
                      onClick={() => markSectionComplete(currentSection)}
                      className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Mark Complete</span>
                    </button>
                  )}

                  {currentSection === lessonData.content.length - 1 ? (
                    <button
                      onClick={completeLesson}
                      className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <Trophy className="w-5 h-5" />
                      <span>Complete & Take Quiz</span>
                    </button>
                  ) : (
                    <button
                      onClick={goToNextSection}
                      className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveLessonPage;