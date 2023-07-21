export const plantsToUnlockStock = [
      {
      id: 1,
      name: 'Sunflower',
      imgUrl:
        'https://thumbs.dreamstime.com/z/three-sunflower-19926958.jpg?w=576',
      level: 1,
      basePrice: 10,
      sellingPrice: 3,
      productionRate: 0,
      costToUnlock: 0,
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
    id: 2,
    name: 'Rose',
    basePrice: 20,
    imgUrl:'https://thumbs.dreamstime.com/z/open-red-rose-white-fully-blossomed-perfect-stem-leaves-pure-background-38686724.jpg?w=576',
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
    imgUrl:'https://thumbs.dreamstime.com/z/tulip-dutch-design-gorgeous-new-addition-deep-cherry-pink-petals-capped-snow-white-margin-tulip-dutch-design-gorgeous-199780340.jpg?w=576',
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
    imgUrl:'https://thumbs.dreamstime.com/z/white-lily-3446447.jpg?w=576',
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
    imgUrl:'https://thumbs.dreamstime.com/z/boat-orchid-flowers-isolated-white-background-144273118.jpg?w=576',
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