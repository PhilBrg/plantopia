import { Farmer, FarmerUpgrade } from './FarmerTypes'

const name = [
  'Brad Pitiful',
  'Tom Cranks',
  'Will Fighting',
  'Beyonse',
  'Kanye Nest',
  'Emma Stoned',
  'Meryl Streak',
  'Justin Beaver',
  'Lady Gaggle',
  'Julia Boberts',
  'Oprah Windbag',
  'Nicolas Cagey',
  'Harry Blotter',
  'Madonna Fries',
  'George Cloney',
  'Snoop Doggy Pug',
  'Taylor Swiftkick',
  'Tina Fey-ve',
  'Ellen DeGenerous',
  'Jay-Zebra',
  'Barack Ollama',
  'Emma Wat-Son',
  'Bradley Coopurr',
  'Cameron Diaper',
  'Jackie Chaotic',
  'Ryan Goofling',
  'Michelle Obummer',
  'Johnny Deep-Fry',
  'Matt Demon',
  'Tom Hanksy-Panksy',
  'Emma Stone-cold',
  'Hugh Jacked-man',
  'Julia Robertsaw',
  'Denzel Washed-up'
]

function getRandomFloat(min: number, max: number) {
  return Math.random() * (max - min) + min
}

const upgrades: FarmerUpgrade[] = [
  {
    id: 1,
    name: 'Automated Irrigation System',
    description:
      'Install an advanced irrigation system for automatic watering.',
    cost: 1000,
    volumeMarginRate: 0.2,
    sellingMarginRate: 0,
    effect: 'Increase volume margin by 20%.',
    isActive: false
  },
  {
    id: 2,
    name: 'Fertilizer Boost',
    description: 'Introduce specialized fertilizers for enhanced plant growth.',
    cost: 10000,
    volumeMarginRate: 0.25,
    sellingMarginRate: 0,
    effect: 'Increase volume margin by 25%.',
    isActive: false
  },
  {
    id: 3,
    name: 'Greenhouse Expansion',
    description: 'Expand the size and capacity of your greenhouses.',
    cost: 50000,
    volumeMarginRate: 0,
    sellingMarginRate: 0.3,
    effect: 'Increase selling margin by 30%.',
    isActive: false
  },
  {
    id: 4,
    name: 'Improved Crop Genetics',
    description:
      'Develop superior plant varieties for higher yields and disease resistance.',
    cost: 100000,
    volumeMarginRate: 0,
    sellingMarginRate: 0.2,
    effect: 'Increase selling margin by 20%.',
    isActive: false
  },
  {
    id: 5,
    name: 'Efficient Harvesting Equipment',
    description:
      'Upgrade harvesting equipment for faster and more efficient crop collection.',
    cost: 500000,
    volumeMarginRate: 0.3,
    sellingMarginRate: 0,
    effect: 'Increase volume margin by 30%.',
    isActive: false
  },
  {
    id: 6,
    name: 'Pest Control System',
    description: 'Implement an advanced eco-friendly pest control system.',
    cost: 1000000,
    volumeMarginRate: 0.5,
    sellingMarginRate: 0,
    effect: 'Increase volume margin by 50%.',
    isActive: false
  },
  {
    id: 7,
    name: 'Farmer Training Program',
    description: 'Establish a comprehensive training program for farmers.',
    cost: 1000000,
    volumeMarginRate: 0.3,
    sellingMarginRate: 0.3,
    effect: 'Increase volume and selling margin by 30%.',
    isActive: false
  },
  {
    id: 8,
    name: 'Supply Chain Optimization',
    description: 'Upgrade logistics and transportation for faster delivery.',
    cost: 5000000,
    volumeMarginRate: 0.5,
    sellingMarginRate: 0.5,
    effect: 'Increase volume and selling margin by 50%.',
    isActive: false
  }
]

export const farmersToUnlockStock: Farmer[] = name.map((name, index) => ({
  id: index + 1,
  name: name,
  level: 1,
  volumeMargin: getRandomFloat(1, 5),
  sellingMargin: getRandomFloat(1, 5),
  plantId: 1,
  upgrades: upgrades
}))
