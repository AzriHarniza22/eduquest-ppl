const badgeData = [
  {
    title: "First Steps",
    description: "Complete your first module",
    category: "Learning",
    icon: "🎯",
    points: 50,
    requirements: {
      type: "modules_completed",
      target: 1
    },
    rarity: "common"
  },
  {
    title: "Knowledge Seeker",
    description: "Complete 5 modules",
    category: "Learning",
    icon: "📚",
    points: 100,
    requirements: {
      type: "modules_completed",
      target: 5
    },
    rarity: "common"
  },
  {
    title: "SDG Explorer",
    description: "Complete 10 modules",
    category: "Learning",
    icon: "🌍",
    points: 200,
    requirements: {
      type: "modules_completed",
      target: 10
    },
    rarity: "rare"
  },
  {
    title: "Quiz Master",
    description: "Complete 5 challenges",
    category: "Quiz",
    icon: "🧠",
    points: 150,
    requirements: {
      type: "challenges_completed",
      target: 5
    },
    rarity: "common"
  },
  {
    title: "Challenge Champion",
    description: "Complete 20 challenges",
    category: "Quiz",
    icon: "🏆",
    points: 300,
    requirements: {
      type: "challenges_completed",
      target: 20
    },
    rarity: "rare"
  },
  {
    title: "Daily Achiever",
    description: "Complete daily challenge",
    category: "Daily",
    icon: "⭐",
    points: 25,
    requirements: {
      type: "daily_challenges",
      target: 1
    },
    rarity: "common"
  },
  {
    title: "Streak Starter",
    description: "Maintain 7-day streak",
    category: "Streak",
    icon: "🔥",
    points: 100,
    requirements: {
      type: "streak_days",
      target: 7
    },
    rarity: "common"
  },
  {
    title: "Dedicated Learner",
    description: "Maintain 30-day streak",
    category: "Streak",
    icon: "💪",
    points: 500,
    requirements: {
      type: "streak_days",
      target: 30
    },
    rarity: "epic"
  },
  {
    title: "Point Collector",
    description: "Earn 1000 points",
    category: "Learning",
    icon: "💎",
    points: 100,
    requirements: {
      type: "points_earned",
      target: 1000
    },
    rarity: "rare"
  },
  {
    title: "SDG Champion",
    description: "Complete all 17 SDGs",
    category: "Learning",
    icon: "🌟",
    points: 1000,
    requirements: {
      type: "sdgs_completed",
      target: 17
    },
    rarity: "legendary"
  }
];

module.exports = badgeData;