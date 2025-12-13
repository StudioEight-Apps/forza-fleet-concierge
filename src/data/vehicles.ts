export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  type: 'suv' | 'sports';
  image: string;
  originalPrice: number;
  salePrice?: number;
  year: number;
  specs: {
    horsepower: number;
    acceleration: string;
    topSpeed: string;
    transmission: string;
  };
  features: string[];
  minAge: number;
  insuranceRequired: string;
}

export const vehicles: Vehicle[] = [
  {
    id: '1',
    brand: 'Lamborghini',
    model: 'Urus SE',
    type: 'suv',
    image: 'https://images.unsplash.com/photo-1669471028405-7b9f9fd58aec?w=800&auto=format&fit=crop&q=80',
    originalPrice: 1299,
    salePrice: 1099,
    year: 2024,
    specs: {
      horsepower: 789,
      acceleration: '3.4s 0-60',
      topSpeed: '193 mph',
      transmission: '8-Speed Auto',
    },
    features: ['Unlimited Miles', 'Full Insurance', 'Delivery Available', 'Concierge Service'],
    minAge: 25,
    insuranceRequired: '$300k liability minimum',
  },
  {
    id: '2',
    brand: 'Rolls Royce',
    model: 'Cullinan',
    type: 'suv',
    image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&auto=format&fit=crop&q=80',
    originalPrice: 1599,
    salePrice: 1399,
    year: 2024,
    specs: {
      horsepower: 563,
      acceleration: '4.8s 0-60',
      topSpeed: '155 mph',
      transmission: '8-Speed Auto',
    },
    features: ['Unlimited Miles', 'Full Insurance', 'Chauffeur Optional', 'Starlight Headliner'],
    minAge: 25,
    insuranceRequired: '$300k liability minimum',
  },
  {
    id: '3',
    brand: 'Ferrari',
    model: 'SF90 Stradale',
    type: 'sports',
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&auto=format&fit=crop&q=80',
    originalPrice: 2499,
    salePrice: 2199,
    year: 2024,
    specs: {
      horsepower: 986,
      acceleration: '2.5s 0-60',
      topSpeed: '211 mph',
      transmission: '8-Speed DCT',
    },
    features: ['150 Miles/Day', 'Track Ready', 'Premium Insurance', 'Performance Brief'],
    minAge: 30,
    insuranceRequired: '$500k liability minimum',
  },
  {
    id: '4',
    brand: 'McLaren',
    model: '720S Spider',
    type: 'sports',
    image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&auto=format&fit=crop&q=80',
    originalPrice: 1899,
    salePrice: 1699,
    year: 2024,
    specs: {
      horsepower: 710,
      acceleration: '2.8s 0-60',
      topSpeed: '212 mph',
      transmission: '7-Speed DCT',
    },
    features: ['200 Miles/Day', 'Convertible Top', 'Premium Insurance', 'Track Mode'],
    minAge: 28,
    insuranceRequired: '$400k liability minimum',
  },
  {
    id: '5',
    brand: 'Porsche',
    model: '911 GT3 RS',
    type: 'sports',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&auto=format&fit=crop&q=80',
    originalPrice: 1499,
    year: 2024,
    specs: {
      horsepower: 518,
      acceleration: '3.0s 0-60',
      topSpeed: '184 mph',
      transmission: '7-Speed PDK',
    },
    features: ['200 Miles/Day', 'Track Package', 'Full Insurance', 'Race Telemetry'],
    minAge: 25,
    insuranceRequired: '$300k liability minimum',
  },
  {
    id: '6',
    brand: 'Bentley',
    model: 'Continental GT',
    type: 'sports',
    image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&auto=format&fit=crop&q=80',
    originalPrice: 1399,
    salePrice: 1199,
    year: 2024,
    specs: {
      horsepower: 650,
      acceleration: '3.5s 0-60',
      topSpeed: '208 mph',
      transmission: '8-Speed DCT',
    },
    features: ['Unlimited Miles', 'Full Insurance', 'Massage Seats', 'Rotating Display'],
    minAge: 25,
    insuranceRequired: '$300k liability minimum',
  },
];

export const getVehiclesByType = (type: 'all' | 'suv' | 'sports') => {
  if (type === 'all') return vehicles;
  return vehicles.filter(v => v.type === type);
};

export const getVehicleById = (id: string) => {
  return vehicles.find(v => v.id === id);
};
