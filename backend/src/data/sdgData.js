const sdgData = [
  {
    id: 1,
    name: "No Poverty",
    description: "End poverty in all its forms everywhere",
    icon: "🏠",
    color: "#e5243b",
    targets: [
      "Eradicate extreme poverty",
      "Reduce poverty by at least 50%",
      "Implement social protection systems",
      "Equal rights to economic resources"
    ],
    keyFacts: [
      "Over 700 million people live in extreme poverty",
      "Most live in rural areas",
      "Poverty affects children disproportionately",
      "Social protection is crucial for poverty reduction"
    ]
  },
  {
    id: 2,
    name: "Zero Hunger",
    description: "End hunger, achieve food security and improved nutrition and promote sustainable agriculture",
    icon: "🌾",
    color: "#dda63a",
    targets: [
      "End hunger and malnutrition",
      "Double agricultural productivity",
      "Ensure sustainable food systems",
      "Maintain genetic diversity"
    ],
    keyFacts: [
      "Nearly 690 million people are hungry",
      "3 billion people cannot afford healthy diets",
      "Agriculture employs 26% of the global workforce",
      "Climate change threatens food security"
    ]
  },
  {
    id: 3,
    name: "Good Health and Well-being",
    description: "Ensure healthy lives and promote well-being for all at all ages",
    icon: "🏥",
    color: "#4c9f38",
    targets: [
      "Reduce maternal mortality",
      "End preventable deaths of children",
      "Combat infectious diseases",
      "Achieve universal health coverage"
    ],
    keyFacts: [
      "Life expectancy has increased globally",
      "Child mortality rates have been cut in half",
      "HIV/AIDS deaths have fallen by 51%",
      "Universal health coverage is still lacking"
    ]
  },
  {
    id: 4,
    name: "Quality Education",
    description: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all",
    icon: "📚",
    color: "#c5192d",
    targets: [
      "Universal primary and secondary education",
      "Equal access to quality early childhood development",
      "Eliminate gender disparities in education",
      "Ensure inclusive and equitable quality education"
    ],
    keyFacts: [
      "262 million children are out of school",
      "617 million youth lack basic literacy",
      "Less than 40% of girls in sub-Saharan Africa complete lower secondary school",
      "4 million additional teachers are needed"
    ]
  },
  {
    id: 5,
    name: "Gender Equality",
    description: "Achieve gender equality and empower all women and girls",
    icon: "⚖️",
    color: "#ff3a21",
    targets: [
      "End discrimination against women and girls",
      "Eliminate violence against women",
      "Eliminate harmful practices",
      "Ensure full participation in leadership"
    ],
    keyFacts: [
      "Women earn 23% less than men globally",
      "1 in 5 women have experienced physical violence",
      "Only 24% of parliamentarians are women",
      "750 million women were married before age 18"
    ]
  },
  {
    id: 6,
    name: "Clean Water and Sanitation",
    description: "Ensure availability and sustainable management of water and sanitation for all",
    icon: "💧",
    color: "#26bde2",
    targets: [
      "Universal access to safe drinking water",
      "Access to adequate sanitation and hygiene",
      "Improve water quality",
      "Protect water-related ecosystems"
    ],
    keyFacts: [
      "2 billion people lack safely managed drinking water",
      "3.6 billion people lack safely managed sanitation",
      "Water scarcity affects 40% of the population",
      "80% of wastewater is discharged untreated"
    ]
  },
  {
    id: 7,
    name: "Affordable and Clean Energy",
    description: "Ensure access to affordable, reliable, sustainable and modern energy for all",
    icon: "⚡",
    color: "#fcc30b",
    targets: [
      "Universal access to modern energy services",
      "Increase share of renewable energy",
      "Double the rate of energy efficiency",
      "Enhance international cooperation"
    ],
    keyFacts: [
      "789 million people lack access to electricity",
      "2.8 billion people rely on polluting fuels for cooking",
      "Renewable energy employment reached 11.5 million",
      "Energy efficiency improvements slowed in 2018"
    ]
  },
  {
    id: 8,
    name: "Decent Work and Economic Growth",
    description: "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all",
    icon: "💼",
    color: "#a21942",
    targets: [
      "Sustain per capita economic growth",
      "Achieve higher levels of economic productivity",
      "Promote policies for decent job creation",
      "Improve resource efficiency in consumption"
    ],
    keyFacts: [
      "Global unemployment affects 188 million people",
      "470 million jobs are needed for newcomers",
      "Women earn 20% less than men",
      "Working poverty affects 630 million people"
    ]
  },
  {
    id: 9,
    name: "Industry, Innovation and Infrastructure",
    description: "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation",
    icon: "🏭",
    color: "#fd6925",
    targets: [
      "Develop quality infrastructure",
      "Promote inclusive industrialization",
      "Increase access to financial services",
      "Upgrade infrastructure for sustainability"
    ],
    keyFacts: [
      "1 billion people lack access to all-weather roads",
      "Manufacturing is the largest employer",
      "4G network covers 95% of the world population",
      "Internet users increased from 1 billion to 4.1 billion"
    ]
  },
  {
    id: 10,
    name: "Reduced Inequality",
    description: "Reduce inequality within and among countries",
    icon: "⚖️",
    color: "#dd1367",
    targets: [
      "Achieve income growth for bottom 40%",
      "Empower and promote social inclusion",
      "Ensure equal opportunity",
      "Adopt fiscal and wage policies"
    ],
    keyFacts: [
      "Income inequality has increased in most countries",
      "Top 1% of population holds 40% of global wealth",
      "70% of the global population lives in countries with growing inequality",
      "Social protection coverage is expanding"
    ]
  },
  {
    id: 11,
    name: "Sustainable Cities and Communities",
    description: "Make cities and human settlements inclusive, safe, resilient and sustainable",
    icon: "🏙️",
    color: "#fd9d24",
    targets: [
      "Ensure access to adequate housing",
      "Provide access to safe transport systems",
      "Enhance inclusive urbanization",
      "Protect cultural and natural heritage"
    ],
    keyFacts: [
      "68% of the population will live in cities by 2050",
      "Cities consume 78% of global energy",
      "Cities produce 70% of global CO2 emissions",
      "1 billion people live in slums"
    ]
  },
  {
    id: 12,
    name: "Responsible Consumption and Production",
    description: "Ensure sustainable consumption and production patterns",
    icon: "♻️",
    color: "#bf8b2e",
    targets: [
      "Implement 10-year framework on sustainable consumption",
      "Achieve sustainable management of natural resources",
      "Halve global food waste per capita",
      "Reduce waste generation"
    ],
    keyFacts: [
      "1.3 billion tons of food is wasted annually",
      "2 billion people are overweight or obese",
      "Water use has grown at twice the rate of population",
      "E-waste is the fastest-growing waste stream"
    ]
  },
  {
    id: 13,
    name: "Climate Action",
    description: "Take urgent action to combat climate change and its impacts",
    icon: "🌍",
    color: "#3f7e44",
    targets: [
      "Strengthen resilience to climate hazards",
      "Integrate climate change measures into policies",
      "Improve education on climate change",
      "Implement Paris Agreement commitments"
    ],
    keyFacts: [
      "Global temperature has risen by 1.1°C since pre-industrial times",
      "2019 was the second warmest year on record",
      "Sea levels are rising at 3.3mm per year",
      "Arctic sea ice is declining at 13% per decade"
    ]
  },
  {
    id: 14,
    name: "Life Below Water",
    description: "Conserve and sustainably use the oceans, seas and marine resources for sustainable development",
    icon: "🐠",
    color: "#0a97d9",
    targets: [
      "Prevent and reduce marine pollution",
      "Protect marine and coastal ecosystems",
      "Minimize ocean acidification",
      "Regulate fishing and end overfishing"
    ],
    keyFacts: [
      "Oceans cover 71% of Earth's surface",
      "3 billion people depend on fish for protein",
      "30% of fish stocks are overexploited",
      "Plastic pollution affects 86% of sea turtle species"
    ]
  },
  {
    id: 15,
    name: "Life on Land",
    description: "Protect, restore and promote sustainable use of terrestrial ecosystems",
    icon: "🌳",
    color: "#56c02b",
    targets: [
      "Ensure conservation of terrestrial ecosystems",
      "Promote sustainable forest management",
      "Combat desertification",
      "Halt biodiversity loss"
    ],
    keyFacts: [
      "31% of land area is covered by forests",
      "1.6 billion people depend on forests for livelihoods",
      "Species are disappearing 1,000 times faster than natural rate",
      "10 million hectares of forest are lost annually"
    ]
  },
  {
    id: 16,
    name: "Peace and Justice Strong Institutions",
    description: "Promote peaceful and inclusive societies for sustainable development",
    icon: "⚖️",
    color: "#00689d",
    targets: [
      "Reduce violence and related death rates",
      "End abuse and trafficking of children",
      "Promote rule of law",
      "Develop effective institutions"
    ],
    keyFacts: [
      "68.5 million people have been forcibly displaced",
      "1 billion people lack legal identity",
      "Every 2 seconds, a person is forced to flee their home",
      "Corruption costs $1.26 trillion annually"
    ]
  },
  {
    id: 17,
    name: "Partnerships to achieve the Goal",
    description: "Strengthen the means of implementation and revitalize the global partnership for sustainable development",
    icon: "🤝",
    color: "#19486a",
    targets: [
      "Mobilize resources for developing countries",
      "Enhance North-South cooperation",
      "Promote effective public partnerships",
      "Enhance global macroeconomic stability"
    ],
    keyFacts: [
      "Aid flows decreased by 2.7% in 2018",
      "Debt service as percentage of exports increased",
      "Internet penetration has doubled since 2010",
      "Technology transfer is essential for development"
    ]
  }
];

module.exports = sdgData;