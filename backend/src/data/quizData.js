// data/quizData.js
const quizTemplates = [
  {
    sdgId: 1,
    title: "No Poverty Quiz",
    description: "Test your knowledge about global poverty challenges and solutions",
    questions: [
      {
        question: "What percentage of the world's population lives in extreme poverty according to recent data?",
        type: "multiple_choice",
        options: ["5%", "8%", "12%", "15%"],
        correctAnswer: "8%",
        explanation: "According to World Bank data, approximately 8% of the global population lives in extreme poverty (less than $2.15 per day).",
        points: 10,
        order: 1
      },
      {
        question: "Extreme poverty is defined as living on less than $2.15 per day.",
        type: "true_false",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "The World Bank defines extreme poverty as living on less than $2.15 per day (2017 PPP).",
        points: 10,
        order: 2
      },
      {
        question: "Which region has the highest concentration of people living in extreme poverty?",
        type: "multiple_choice",
        options: ["Sub-Saharan Africa", "South Asia", "Latin America", "East Asia"],
        correctAnswer: "Sub-Saharan Africa",
        explanation: "Sub-Saharan Africa has the highest concentration of people living in extreme poverty, with over 40% of the region's population affected.",
        points: 15,
        order: 3
      },
      {
        question: "What are the main causes of poverty? (Select the most comprehensive answer)",
        type: "multiple_choice",
        options: [
          "Lack of education only",
          "Unemployment and low wages only", 
          "Lack of education, unemployment, inequality, poor governance, and limited access to resources",
          "Natural disasters only"
        ],
        correctAnswer: "Lack of education, unemployment, inequality, poor governance, and limited access to resources",
        explanation: "Poverty is a complex issue with multiple interconnected causes including education, employment, inequality, governance, and resource access.",
        points: 15,
        order: 4
      },
      {
        question: "Universal Basic Income (UBI) has been successfully tested in some countries to reduce poverty.",
        type: "true_false",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "Several countries have piloted UBI programs with varying degrees of success in reducing poverty and improving social outcomes.",
        points: 10,
        order: 5
      }
    ],
    timeLimit: 15,
    passingScore: 70,
    maxAttempts: 3,
    shuffleQuestions: true,
    shuffleOptions: true,
    showResultsImmediately: true,
    isActive: true
  },
  {
    sdgId: 2,
    title: "Zero Hunger Quiz",
    description: "Test your understanding of global hunger and food security challenges",
    questions: [
      {
        question: "How many people worldwide suffer from chronic hunger?",
        type: "multiple_choice",
        options: ["500 million", "735 million", "1.2 billion", "2 billion"],
        correctAnswer: "735 million",
        explanation: "According to FAO, approximately 735 million people worldwide faced hunger in 2023.",
        points: 10,
        order: 1
      },
      {
        question: "Food security means having access to sufficient, safe, and nutritious food.",
        type: "true_false",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "Food security is defined as having physical and economic access to sufficient, safe, and nutritious food.",
        points: 10,
        order: 2
      },
      {
        question: "Which factor contributes most to global food insecurity?",
        type: "multiple_choice",
        options: ["Climate change", "Conflict and instability", "Economic inequality", "All of the above"],
        correctAnswer: "All of the above",
        explanation: "Food insecurity results from multiple factors including climate change, conflicts, and economic inequality working together.",
        points: 15,
        order: 3
      },
      {
        question: "Sustainable agriculture can help address hunger while protecting the environment.",
        type: "true_false",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "Sustainable agriculture practices can increase food production while minimizing environmental impact.",
        points: 10,
        order: 4
      },
      {
        question: "What percentage of the world's food is wasted annually?",
        type: "multiple_choice",
        options: ["10%", "20%", "30%", "40%"],
        correctAnswer: "30%",
        explanation: "Approximately one-third (30%) of all food produced globally is lost or wasted each year.",
        points: 15,
        order: 5
      }
    ],
    timeLimit: 12,
    passingScore: 70,
    maxAttempts: 3,
    shuffleQuestions: true,
    shuffleOptions: true,
    showResultsImmediately: true,
    isActive: true
  },
  {
    sdgId: 3,
    title: "Good Health and Well-being Quiz",
    description: "Test your knowledge about global health challenges and healthcare access",
    questions: [
      {
        question: "What is the leading cause of death globally?",
        type: "multiple_choice",
        options: ["Heart disease", "Cancer", "Infectious diseases", "Accidents"],
        correctAnswer: "Heart disease",
        explanation: "Cardiovascular diseases are the leading cause of death globally, accounting for about 17.9 million deaths annually.",
        points: 10,
        order: 1
      },
      {
        question: "Universal Health Coverage means everyone has access to quality healthcare without financial hardship.",
        type: "true_false",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "Universal Health Coverage ensures all people have access to needed health services without suffering financial hardship.",
        points: 10,
        order: 2
      },
      {
        question: "How many people worldwide lack access to basic healthcare services?",
        type: "multiple_choice",
        options: ["1 billion", "2 billion", "3.5 billion", "5 billion"],
        correctAnswer: "3.5 billion",
        explanation: "According to WHO, at least 3.5 billion people worldwide lack access to essential health services.",
        points: 15,
        order: 3
      },
      {
        question: "Mental health is just as important as physical health.",
        type: "true_false",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "Mental health is a crucial component of overall health and well-being, deserving equal attention and resources.",
        points: 10,
        order: 4
      }
    ],
    timeLimit: 10,
    passingScore: 70,
    maxAttempts: 3,
    shuffleQuestions: true,
    shuffleOptions: true,
    showResultsImmediately: true,
    isActive: true
  },
  {
    sdgId: 4,
    title: "Quality Education Quiz",
    description: "Test your understanding of global education challenges and solutions",
    questions: [
      {
        question: "How many children worldwide are out of school?",
        type: "multiple_choice",
        options: ["150 million", "244 million", "300 million", "500 million"],
        correctAnswer: "244 million",
        explanation: "UNESCO estimates that 244 million children and youth are out of school worldwide.",
        points: 10,
        order: 1
      },
      {
        question: "Education is a fundamental human right.",
        type: "true_false",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "Education is recognized as a fundamental human right in the Universal Declaration of Human Rights.",
        points: 10,
        order: 2
      },
      {
        question: "Which factor is the biggest barrier to education globally?",
        type: "multiple_choice",
        options: ["Poverty", "Gender discrimination", "Conflict", "All are significant barriers"],
        correctAnswer: "All are significant barriers",
        explanation: "Multiple factors including poverty, discrimination, and conflict create barriers to education access.",
        points: 15,
        order: 3
      },
      {
        question: "Quality education should focus only on basic literacy and numeracy skills.",
        type: "true_false",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "Quality education includes critical thinking, creativity, digital literacy, and life skills beyond basic literacy and numeracy.",
        points: 10,
        order: 4
      }
    ],
    timeLimit: 10,
    passingScore: 70,
    maxAttempts: 3,
    shuffleQuestions: true,
    shuffleOptions: true,
    showResultsImmediately: true,
    isActive: true
  },
  {
    sdgId: 5,
    title: "Gender Equality Quiz",
    description: "Test your knowledge about gender equality and women's empowerment",
    questions: [
      {
        question: "What percentage of the world's parliamentarians are women?",
        type: "multiple_choice",
        options: ["15%", "26%", "35%", "45%"],
        correctAnswer: "26%",
        explanation: "According to IPU data, women hold approximately 26% of parliamentary seats globally.",
        points: 10,
        order: 1
      },
      {
        question: "Gender equality benefits only women and girls.",
        type: "true_false",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "Gender equality benefits everyone by creating more inclusive, productive, and sustainable societies.",
        points: 10,
        order: 2
      },
      {
        question: "Which region has achieved the highest level of gender parity in education?",
        type: "multiple_choice",
        options: ["Sub-Saharan Africa", "Middle East", "Latin America", "Europe and North America"],
        correctAnswer: "Europe and North America",
        explanation: "Europe and North America have achieved the highest levels of gender parity in education enrollment.",
        points: 15,
        order: 3
      },
      {
        question: "Women perform about 75% of the world's unpaid care work.",
        type: "true_false",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "Women perform approximately 75% of unpaid care work globally, limiting their economic opportunities.",
        points: 10,
        order: 4
      }
    ],
    timeLimit: 10,
    passingScore: 70,
    maxAttempts: 3,
    shuffleQuestions: true,
    shuffleOptions: true,
    showResultsImmediately: true,
    isActive: true
  }
];

// Generate basic quiz templates for SDGs 6-17
const generateBasicQuiz = (sdgId, title, description) => ({
  sdgId,
  title: `${title} Quiz`,
  description: `Test your knowledge about ${title.toLowerCase()}`,
  questions: [
    {
      question: `What is the main focus of SDG ${sdgId}: ${title}?`,
      type: "multiple_choice",
      options: [
        "Economic development only",
        "Environmental protection only", 
        "Social development only",
        "Comprehensive sustainable development addressing multiple challenges"
      ],
      correctAnswer: "Comprehensive sustainable development addressing multiple challenges",
      explanation: `SDG ${sdgId} addresses ${title.toLowerCase()} through a comprehensive approach to sustainable development.`,
      points: 15,
      order: 1
    },
    {
      question: `${title} is important for achieving sustainable development.`,
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: `${title} is crucial for achieving sustainable development and improving quality of life globally.`,
      points: 10,
      order: 2
    },
    {
      question: `Which approach is most effective for addressing ${title.toLowerCase()} challenges?`,
      type: "multiple_choice",
      options: [
        "Individual action only",
        "Government action only",
        "Private sector action only",
        "Collaborative action involving all stakeholders"
      ],
      correctAnswer: "Collaborative action involving all stakeholders",
      explanation: `Addressing ${title.toLowerCase()} requires collaboration between individuals, governments, private sector, and civil society.`,
      points: 15,
      order: 3
    },
    {
      question: `Progress on ${title.toLowerCase()} can be measured and monitored.`,
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: `The UN tracks progress on all SDGs, including ${title}, through specific indicators and targets.`,
      points: 10,
      order: 4
    }
  ],
  timeLimit: 8,
  passingScore: 70,
  maxAttempts: 3,
  shuffleQuestions: true,
  shuffleOptions: true,
  showResultsImmediately: true,
  isActive: true
});

// Add quizzes for SDGs 6-17
const additionalQuizzes = [
  generateBasicQuiz(6, "Clean Water and Sanitation", "water access and sanitation challenges"),
  generateBasicQuiz(7, "Affordable and Clean Energy", "renewable energy and energy access"),
  generateBasicQuiz(8, "Decent Work and Economic Growth", "employment and economic development"),
  generateBasicQuiz(9, "Industry, Innovation and Infrastructure", "sustainable industrialization"),
  generateBasicQuiz(10, "Reduced Inequalities", "inequality challenges and solutions"),
  generateBasicQuiz(11, "Sustainable Cities and Communities", "urban sustainability"),
  generateBasicQuiz(12, "Responsible Consumption and Production", "sustainable consumption patterns"),
  generateBasicQuiz(13, "Climate Action", "climate change and mitigation"),
  generateBasicQuiz(14, "Life Below Water", "marine conservation and ocean health"),
  generateBasicQuiz(15, "Life on Land", "terrestrial ecosystems and biodiversity"),
  generateBasicQuiz(16, "Peace, Justice and Strong Institutions", "governance and justice systems"),
  generateBasicQuiz(17, "Partnerships for the Goals", "global cooperation and partnerships")
];

const allQuizTemplates = [...quizTemplates, ...additionalQuizzes];

// Seeding functions
const seedQuizzes = async () => {
  const Quiz = require('../models/Quiz');
  const Lesson = require('../models/Lesson');
  
  try {
    // Clear existing quizzes
    await Quiz.deleteMany({});
    
    // Get lessons to link with quizzes
    const lessons = await Lesson.find({});
    
    // Add lessonId to each quiz
    const quizzesWithLessons = allQuizTemplates.map(quiz => {
      const relatedLesson = lessons.find(lesson => lesson.sdgId === quiz.sdgId);
      return {
        ...quiz,
        lessonId: relatedLesson ? relatedLesson._id : null
      };
    });
    
    // Insert new quizzes
    const quizzes = await Quiz.insertMany(quizzesWithLessons);
    console.log(`Successfully seeded ${quizzes.length} quizzes`);
    return quizzes;
  } catch (error) {
    console.error('Error seeding quizzes:', error);
    throw error;
  }
};

const generateQuizBySdg = (sdgId) => {
  return allQuizTemplates.find(quiz => quiz.sdgId === sdgId);
};

module.exports = {
  quizTemplates: allQuizTemplates,
  seedQuizzes,
  generateQuizBySdg
};