'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Quiz {
  title: string;
  description: string;
  totalQuestions: number;
  timeMinutes: number;
  questions: Question[];
}

const QuizPage = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  
  // Mock data - in real app, fetch from MongoDB
  const [quizData, setQuizData] = useState({
    title: "SDG 1: No Poverty - Quiz",
    description: "Test your understanding of poverty eradication concepts",
    totalQuestions: 5,
    timeMinutes: 5,
    questions: [
      {
        id: 1,
        question: "What percentage of the world's population lives in extreme poverty according to SDG 1?",
        options: [
          "Less than 5%",
          "Around 10%", 
          "More than 15%",
          "About 20%"
        ],
        correctAnswer: 1,
        explanation: "According to the World Bank, around 10% of the world's population lives in extreme poverty, defined as living on less than $1.90 per day."
      },
      {
        id: 2,
        question: "Which region has the highest concentration of people living in extreme poverty?",
        options: [
          "Latin America",
          "Sub-Saharan Africa",
          "South Asia", 
          "East Asia"
        ],
        correctAnswer: 1,
        explanation: "Sub-Saharan Africa has the highest concentration of people living in extreme poverty, with over 40% of the population affected."
      },
      {
        id: 3,
        question: "What is the main target year for achieving SDG 1?",
        options: [
          "2025",
          "2030",
          "2035",
          "2040"
        ],
        correctAnswer: 1,
        explanation: "SDG 1 aims to end poverty in all its forms everywhere by 2030, as part of the 2030 Agenda for Sustainable Development."
      },
      {
        id: 4,
        question: "Which factor is NOT typically considered a dimension of poverty?",
        options: [
          "Income level",
          "Access to education",
          "Personal preferences",
          "Healthcare access"
        ],
        correctAnswer: 2,
        explanation: "Poverty is multidimensional, including income, education, healthcare, and basic services. Personal preferences are not a dimension of poverty measurement."
      },
      {
        id: 5,
        question: "What does 'social protection systems' refer to in the context of SDG 1?",
        options: [
          "Military defense programs",
          "Safety nets and welfare programs",
          "Environmental protection laws",
          "Trade protection policies"
        ],
        correctAnswer: 1,
        explanation: "Social protection systems are safety nets like unemployment benefits, food assistance, and healthcare programs that help protect vulnerable populations from poverty."
      }
    ]
  });

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleQuizComplete();
    }
  }, [timeLeft, quizCompleted]);

  // Load quiz data effect
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

    const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    };


  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);

      if (showExplanation) {
        setShowExplanation(false);
        setSelectedAnswer(null);
        
        if (currentQuestion < quizData.questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          handleQuizComplete();
        }
      } else {
        setShowExplanation(true);
      }
    }
  };

  const handleQuizComplete = () => {
    const finalAnswers = [...answers];
    if (selectedAnswer !== null) {
      finalAnswers[currentQuestion] = selectedAnswer;
    }
    
    const correctCount = finalAnswers.reduce((count, answer, index) => {
      return count + (answer === quizData.questions[index]?.correctAnswer ? 1 : 0);
    }, 0);
    
    setScore(correctCount);
    setQuizCompleted(true);
  };

  const getScoreColor = () => {
    const percentage = (score / quizData.questions.length) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = () => {
    const percentage = (score / quizData.questions.length) * 100;
    if (percentage >= 80) return 'Excellent! You have a great understanding of this topic.';
    if (percentage >= 60) return 'Good job! You understand most concepts well.';
    return 'Keep learning! Review the materials and try again.';
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Quiz...</h3>
            <p className="text-gray-500">Preparing your questions</p>
          </div>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
              <p className="text-gray-600">Great job finishing the quiz</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
              <div className="text-6xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {Math.round((score / quizData.questions.length) * 100)}%
              </div>
              <div className={`text-xl font-semibold mb-2 ${getScoreColor()}`}>
                {score} out of {quizData.questions.length} correct
              </div>
              <p className="text-gray-600">{getScoreMessage()}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">{score}</div>
                <div className="text-sm text-blue-700">Correct</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">+{score * 20}</div>
                <div className="text-sm text-purple-700">Points</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">{formatTime(300 - timeLeft)}</div>
                <div className="text-sm text-green-700">Time</div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Link href="/learn" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all">
                Continue Learning
              </Link>
              <button 
                onClick={() => window.location.reload()}
                className="flex-1 border-2 border-blue-300 text-blue-600 py-3 px-6 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestionData = quizData.questions[currentQuestion];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-[#1565C0] to-[#2196F3] text-white p-6 shadow-xl">
        <div className="mb-8">
          <Link href="/dashboard" className="text-2xl font-bold hover:text-blue-200 transition-colors">
            EduQuest
          </Link>
        </div>
        
        <nav className="space-y-2">
          <Link href="/dashboard" className="flex items-center space-x-3 p-3 hover:bg-white/10 rounded-lg transition-colors">
            <span className="text-xl">📊</span>
            <span>Dashboard</span>
          </Link>
          <Link href="/sdg-journey" className="flex items-center space-x-3 p-3 hover:bg-white/10 rounded-lg transition-colors">
            <span className="text-xl">🗺️</span>
            <span>SDG Journey</span>
          </Link>
          <Link href="/learn" className="flex items-center space-x-3 p-3 hover:bg-white/10 rounded-lg transition-colors">
            <span className="text-xl">📚</span>
            <span>Learn</span>
          </Link>
          <Link href="/challenges" className="flex items-center space-x-3 bg-white/20 p-3 rounded-lg">
            <span className="text-xl">🎯</span>
            <span>Quiz</span>
          </Link>
        </nav>

        {/* Quiz Progress */}
        <div className="mt-8 p-4 bg-white/10 rounded-lg">
          <h4 className="font-semibold mb-3">Quiz Progress</h4>
          <div className="space-y-2">
            {quizData.questions.map((_, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  index < currentQuestion ? 'bg-green-500 text-white' :
                  index === currentQuestion ? 'bg-white text-blue-600' :
                  'bg-white/20 text-white/60'
                }`}>
                  {index < currentQuestion ? '✓' : index + 1}
                </div>
                <span className="text-sm">Question {index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-blue-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 text-sm text-blue-600 mb-2">
                <Link href="/learn" className="hover:text-blue-800">Learn</Link>
                <span>›</span>
                <span className="text-blue-800 font-medium">Quiz</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">{quizData.title}</h1>
              <p className="text-gray-600 mt-1">{quizData.description}</p>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold mb-1 ${timeLeft < 60 ? 'text-red-600' : 'text-blue-600'}`}>
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-gray-500">Time remaining</div>
            </div>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="bg-white px-6 py-3 border-b border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-700">
              Question {currentQuestion + 1} of {quizData.questions.length}
            </span>
            <span className="text-sm text-blue-600">
              {Math.round(((currentQuestion + 1) / quizData.questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-blue-100 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Quiz Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
              {/* Question */}
              <div className="p-8">
                <div className="flex items-start space-x-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {currentQuestion + 1}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
                      {currentQuestionData.question}
                    </h2>
                  </div>
                </div>

                {/* Answer Options */}
                <div className="space-y-4">
                  {currentQuestionData.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showExplanation}
                      className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                        selectedAnswer === index
                          ? showExplanation
                            ? index === currentQuestionData.correctAnswer
                              ? 'border-green-500 bg-green-50 text-green-800'
                              : 'border-red-500 bg-red-50 text-red-800'
                            : 'border-blue-500 bg-blue-50 text-blue-800'
                          : showExplanation && index === currentQuestionData.correctAnswer
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                      } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswer === index
                            ? showExplanation
                              ? index === currentQuestionData.correctAnswer
                                ? 'border-green-500 bg-green-500'
                                : 'border-red-500 bg-red-500'
                              : 'border-blue-500 bg-blue-500'
                            : showExplanation && index === currentQuestionData.correctAnswer
                            ? 'border-green-500 bg-green-500'
                            : 'border-gray-300'
                        }`}>
                          {selectedAnswer === index || (showExplanation && index === currentQuestionData.correctAnswer) ? (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : null}
                        </div>
                        <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Explanation */}
                {showExplanation && (
                  <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-2">Explanation</h4>
                        <p className="text-blue-800 leading-relaxed">{currentQuestionData.explanation}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {showExplanation ? (
                      <span className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span>Answer reviewed</span>
                      </span>
                    ) : selectedAnswer !== null ? (
                      <span className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                        <span>Answer selected</span>
                      </span>
                    ) : (
                      'Select an answer to continue'
                    )}
                  </div>
                  
                  <button
                    onClick={handleNextQuestion}
                    disabled={selectedAnswer === null}
                    className={`px-8 py-3 rounded-lg font-medium transition-all transform ${
                      selectedAnswer !== null
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {showExplanation 
                      ? currentQuestion === quizData.questions.length - 1 
                        ? 'Complete Quiz' 
                        : 'Next Question →'
                      : 'Submit Answer'
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizPage;