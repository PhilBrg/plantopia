export const plantsToUnlockStock = [
  {
    id: 2,
    name: 'Rose',
    basePrice: 20,
    sellingPrice: 5,
    productionRate: 0,
    costToUnlock: 2000,
    level: 1,
    stock: 0,
    upgrades: [
      {
        id: 1,
        name: 'Ladybug',
        basePrice: 250,
        productionRate: 1.2,
        isEnabled: false
      },
      {
        id: 2,
        name: 'Irrigation',
        basePrice: 1000,
        productionRate: 1.5,
        isEnabled: false
      }
    ]
  },
  {
    id: 3,
    name: 'Dutch Tulip',
    basePrice: 30,
    sellingPrice: 10,
    productionRate: 0,
    costToUnlock: 6000,
    level: 1,
    stock: 0,
    upgrades: [
      {
        id: 1,
        name: 'Fertilizer',
        basePrice: 250,
        productionRate: 1.2,
        isEnabled: false
      },
      {
        id: 2,
        name: 'Irrigation',
        basePrice: 1000,
        productionRate: 1.5,
        isEnabled: false
      }
    ]
  },
  {
    id: 4,
    name: 'Lily',
    basePrice: 40,
    sellingPrice: 15,
    costToUnlock: 10000,
    productionRate: 0,
    level: 1,
    stock: 0,
    upgrades: [
      {
        id: 1,
        name: 'Fertilizer',
        basePrice: 250,
        productionRate: 1.2,
        isEnabled: false
      },
      {
        id: 2,
        name: 'Irrigation',
        basePrice: 1000,
        productionRate: 1.5,
        isEnabled: false
      }
    ]
  },
  {
    id: 5,
    name: 'Orchid',
    basePrice: 50,
    sellingPrice: 20,
    productionRate: 0,
    costToUnlock: 16000,
    level: 1,
    stock: 0,
    upgrades: [
      {
        id: 1,
        name: 'Tropical Fertilizer',
        basePrice: 250,
        productionRate: 1.2,
        isEnabled: false
      },
      {
        id: 2,
        name: 'Irrigation',
        basePrice: 1000,
        productionRate: 1.5,
        isEnabled: false
      }
    ]
  }
]