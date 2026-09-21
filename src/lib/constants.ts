export const BUSINESS = {
  name: 'Govinda Pet Center',
  tagline: '24/7 Caring for Your Pets',
  address: '23-8-205/202, SV Nagar, New Balaji Colony, Tirupati, Andhra Pradesh 517502',
  whatsapp: '+91 73372 04484',
  whatsappRaw: '917337204484',
  phone: '+91 73372 42347',
  phoneRaw: '917337242347',
  email: 'etamarpuramdivya@gmail.com',
  mapsUrl: 'https://maps.app.goo.gl/9mRka57kYqYBtmns9',
  city: 'Tirupati',
  state: 'Andhra Pradesh',
} as const;

export const PET_SERVICES = [
  'Dog Care',
  'Cat Care',
  'Pet Sitting',
  'Pet Boarding',
  'Pet Pickup & Drop',
  'Place-to-Place Pet Transport',
  'Pet Food & Supplies',
  'Basic Pet Care Support',
  '24/7 Pet Care Assistance',
] as const;

export const BOOKING_STATUSES = [
  'New',
  'Contacted',
  'Confirmed',
  'In Progress',
  'Completed',
  'Cancelled',
] as const;

export const PET_IMAGES = {
  hero: 'https://images.pexels.com/photos/19490691/pexels-photo-19490691.jpeg?auto=compress&cs=tinysrgb&w=940',
  dogCat: 'https://images.pexels.com/photos/35062705/pexels-photo-35062705.jpeg?auto=compress&cs=tinysrgb&w=940',
  dogCat2: 'https://images.pexels.com/photos/16366333/pexels-photo-16366333.jpeg?auto=compress&cs=tinysrgb&w=940',
  dog: 'https://images.pexels.com/photos/34154040/pexels-photo-34154040.jpeg?auto=compress&cs=tinysrgb&w=940',
  cat: 'https://images.pexels.com/photos/18418971/pexels-photo-18418971.jpeg?auto=compress&cs=tinysrgb&w=940',
  cat2: 'https://images.pexels.com/photos/37220239/pexels-photo-37220239.jpeg?auto=compress&cs=tinysrgb&w=940',
  dogCat3: 'https://images.pexels.com/photos/27806129/pexels-photo-27806129.jpeg?auto=compress&cs=tinysrgb&w=940',
  puppies: 'https://images.pexels.com/photos/30990977/pexels-photo-30990977.jpeg?auto=compress&cs=tinysrgb&w=940',
  kittens: 'https://images.pexels.com/photos/38189498/pexels-photo-38189498.jpeg?auto=compress&cs=tinysrgb&w=940',
  cuddle: 'https://images.pexels.com/photos/32553503/pexels-photo-32553503.jpeg?auto=compress&cs=tinysrgb&w=940',
  bengal: 'https://images.pexels.com/photos/16395150/pexels-photo-16395150.jpeg?auto=compress&cs=tinysrgb&w=940',
} as const;

export const BUSINESS_LOCATION = {
  // Approximate coordinates for SV Nagar, New Balaji Colony, Tirupati
  lat: 13.6288,
  lng: 79.4192,
};
