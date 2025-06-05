// data/lessonData.js
const lessonTemplates = [
  {
    sdgId: 1,
    title: "No Poverty - Understanding Global Poverty",
    description: "Learn about global poverty challenges and solutions worldwide",
    content: [
      {
        type: "text",
        title: "Introduction to Poverty",
        data: "Poverty is a state of deprivation, lacking the usual or socially acceptable amount of money or material possessions. It affects billions of people worldwide and is one of the most pressing global challenges of our time.",
        order: 1
      },
      {
        type: "video",
        title: "Global Poverty Statistics",
        data: "dQw4w9WgXcQ",
        order: 2
      },
      {
        type: "text",
        title: "Causes of Poverty",
        data: "Poverty has multiple interconnected causes including lack of education, unemployment, social inequality, lack of access to healthcare, and systemic issues in governance and economic policies.",
        order: 3
      },
      {
        type: "text",
        title: "Solutions and Interventions",
        data: "Addressing poverty requires comprehensive approaches including education programs, job creation, social safety nets, healthcare access, and sustainable economic development initiatives.",
        order: 4
      }
    ],
    videoUrl: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    duration: 30,
    objectives: [
      "Understand the definition and scope of global poverty",
      "Learn about poverty statistics and affected populations",
      "Identify main causes of poverty worldwide",
      "Explore potential solutions and interventions"
    ],
    prerequisites: [],
    difficulty: "beginner",
    tags: ["poverty", "economics", "social issues", "global development"],
    isActive: true
  },
  {
    sdgId: 2,
    title: "Zero Hunger - Food Security and Nutrition",
    description: "Explore global hunger challenges and sustainable food systems",
    content: [
      {
        type: "text",
        title: "Understanding Global Hunger",
        data: "Hunger affects nearly 828 million people worldwide. Food security means having access to sufficient, safe, and nutritious food to maintain a healthy and active life.",
        order: 1
      },
      {
        type: "video",
        title: "Food Security Challenges",
        data: "food_security_video_id",
        order: 2
      },
      {
        type: "text",
        title: "Sustainable Agriculture",
        data: "Sustainable agriculture practices can increase food production while protecting the environment and supporting farmer livelihoods through improved techniques and technologies.",
        order: 3
      }
    ],
    videoUrl: "https://youtube.com/watch?v=food_security_main",
    duration: 25,
    objectives: [
      "Understand global hunger statistics and challenges",
      "Learn about food security concepts",
      "Explore sustainable agriculture solutions"
    ],
    prerequisites: [],
    difficulty: "beginner",
    tags: ["hunger", "food security", "agriculture", "nutrition"],
    isActive: true
  },
  {
    sdgId: 3,
    title: "Good Health and Well-being - Global Health Challenges",
    description: "Learn about global health issues and healthcare access",
    content: [
      {
        type: "text",
        title: "Global Health Overview",
        data: "Health is a fundamental human right. Despite significant progress, billions still lack access to quality healthcare services, and health inequalities persist worldwide.",
        order: 1
      },
      {
        type: "video",
        title: "Healthcare Access Worldwide",
        data: "health_access_video_id",
        order: 2
      },
      {
        type: "text",
        title: "Major Health Challenges",
        data: "Key global health challenges include infectious diseases, non-communicable diseases, maternal and child health issues, and mental health disorders.",
        order: 3
      }
    ],
    videoUrl: "https://youtube.com/watch?v=global_health_main",
    duration: 35,
    objectives: [
      "Understand global health statistics and trends",
      "Learn about healthcare access challenges",
      "Explore major health issues worldwide"
    ],
    prerequisites: [],
    difficulty: "intermediate",
    tags: ["health", "healthcare", "well-being", "medicine"],
    isActive: true
  },
  {
    sdgId: 4,
    title: "Quality Education - Education for All",
    description: "Explore global education challenges and solutions",
    content: [
      {
        type: "text",
        title: "Education as a Human Right",
        data: "Education is a fundamental human right and the foundation for peace and sustainable development. Quality education empowers individuals and transforms communities.",
        order: 1
      },
      {
        type: "video",
        title: "Global Education Statistics",
        data: "education_stats_video_id",
        order: 2
      },
      {
        type: "text",
        title: "Barriers to Education",
        data: "Major barriers include poverty, conflict, discrimination, lack of infrastructure, and insufficient funding for educational systems worldwide.",
        order: 3
      }
    ],
    videoUrl: "https://youtube.com/watch?v=quality_education_main",
    duration: 28,
    objectives: [
      "Understand the importance of quality education",
      "Learn about global education statistics",
      "Identify barriers to educational access"
    ],
    prerequisites: [],
    difficulty: "beginner",
    tags: ["education", "learning", "literacy", "human rights"],
    isActive: true
  },
  {
    sdgId: 5,
    title: "Gender Equality - Empowering Women and Girls",
    description: "Learn about gender equality and women's empowerment",
    content: [
      {
        type: "text",
        title: "Understanding Gender Equality",
        data: "Gender equality means equal rights, responsibilities, and opportunities for all genders. It's essential for sustainable development and human rights.",
        order: 1
      },
      {
        type: "video",
        title: "Women's Rights Worldwide",
        data: "womens_rights_video_id",
        order: 2
      },
      {
        type: "text",
        title: "Challenges and Solutions",
        data: "Key challenges include discrimination, violence, unequal pay, and limited political participation. Solutions involve policy changes, education, and cultural shifts.",
        order: 3
      }
    ],
    videoUrl: "https://youtube.com/watch?v=gender_equality_main",
    duration: 32,
    objectives: [
      "Understand gender equality concepts",
      "Learn about women's rights challenges",
      "Explore empowerment strategies"
    ],
    prerequisites: [],
    difficulty: "intermediate",
    tags: ["gender", "equality", "women", "empowerment", "rights"],
    isActive: true
  }
];

// Generate lessons for SDGs 6-17 with basic templates
const generateBasicLesson = (sdgId, title, description, tags) => ({
  sdgId,
  title,
  description,
  content: [
    {
      type: "text",
      title: `Introduction to ${title}`,
      data: `This lesson covers the fundamental concepts and challenges related to ${title}. Understanding these issues is crucial for sustainable development.`,
      order: 1
    },
    {
      type: "video",
      title: `${title} Overview`,
      data: `sdg${sdgId}_overview_video`,
      order: 2
    },
    {
      type: "text",
      title: "Key Challenges and Solutions",
      data: `Learn about the main challenges and potential solutions related to ${title} in the context of sustainable development goals.`,
      order: 3
    }
  ],
  videoUrl: `https://youtube.com/watch?v=sdg${sdgId}_main_video`,
  duration: 25,
  objectives: [
    `Understand ${title} concepts and importance`,
    "Learn about related challenges and issues",
    "Explore potential solutions and best practices"
  ],
  prerequisites: [],
  difficulty: "beginner",
  tags,
  isActive: true
});

// Add lessons for SDGs 6-17
const additionalLessons = [
  generateBasicLesson(6, "Clean Water and Sanitation", "Learn about water access and sanitation challenges", ["water", "sanitation", "health", "infrastructure"]),
  generateBasicLesson(7, "Affordable and Clean Energy", "Explore renewable energy and energy access", ["energy", "renewable", "climate", "sustainability"]),
  generateBasicLesson(8, "Decent Work and Economic Growth", "Understand employment and economic development", ["employment", "economy", "growth", "labor"]),
  generateBasicLesson(9, "Industry, Innovation and Infrastructure", "Learn about sustainable industrialization", ["industry", "innovation", "infrastructure", "technology"]),
  generateBasicLesson(10, "Reduced Inequalities", "Explore inequality challenges and solutions", ["inequality", "social justice", "inclusion", "discrimination"]),
  generateBasicLesson(11, "Sustainable Cities and Communities", "Learn about urban sustainability", ["cities", "urban", "sustainability", "planning"]),
  generateBasicLesson(12, "Responsible Consumption and Production", "Understand sustainable consumption patterns", ["consumption", "production", "waste", "sustainability"]),
  generateBasicLesson(13, "Climate Action", "Learn about climate change and mitigation", ["climate", "environment", "mitigation", "adaptation"]),
  generateBasicLesson(14, "Life Below Water", "Explore marine conservation and ocean health", ["ocean", "marine", "conservation", "biodiversity"]),
  generateBasicLesson(15, "Life on Land", "Learn about terrestrial ecosystems and biodiversity", ["biodiversity", "forest", "ecosystem", "conservation"]),
  generateBasicLesson(16, "Peace, Justice and Strong Institutions", "Understand governance and justice systems", ["peace", "justice", "governance", "institutions"]),
  generateBasicLesson(17, "Partnerships for the Goals", "Learn about global cooperation and partnerships", ["partnership", "cooperation", "development", "collaboration"])
];

const allLessonTemplates = [...lessonTemplates, ...additionalLessons];

// Seeding functions
const seedLessons = async () => {
  const Lesson = require('../models/Lesson');
  
  try {
    // Clear existing lessons
    await Lesson.deleteMany({});
    
    // Insert new lessons
    const lessons = await Lesson.insertMany(allLessonTemplates);
    console.log(`Successfully seeded ${lessons.length} lessons`);
    return lessons;
  } catch (error) {
    console.error('Error seeding lessons:', error);
    throw error;
  }
};

const generateLessonBySdg = (sdgId) => {
  return allLessonTemplates.find(lesson => lesson.sdgId === sdgId);
};

module.exports = {
  lessonTemplates: allLessonTemplates,
  seedLessons,
  generateLessonBySdg
};