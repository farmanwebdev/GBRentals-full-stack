require('dotenv').config();
const mongoose = require('mongoose');
const User     = require('../models/User');
const Property = require('../models/Property');

const PROPERTIES = [
  {
    title: 'Luxury Beach Villa', type: 'villa', price: 4500, priceType: 'monthly', status: 'approved',
    description: 'Stunning beachfront villa with panoramic ocean views. 4 spacious bedrooms, private pool, and direct beach access.',
    location: { address: '100 Malibu Coast Rd', city: 'Malibu', state: 'CA', country: 'USA', zipCode: '90265' },
    features: { bedrooms: 4, bathrooms: 3, area: 3200, parking: true, furnished: true, pool: true },
    images: [{ url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800' }],
    isFeatured: true,
  },
  {
    title: 'Modern Downtown Apartment', type: 'apartment', price: 2800, priceType: 'monthly', status: 'approved',
    description: 'Contemporary 2-bedroom apartment in the heart of San Francisco. Walking distance to tech offices and transit.',
    location: { address: '500 Market St', city: 'San Francisco', state: 'CA', country: 'USA', zipCode: '94105' },
    features: { bedrooms: 2, bathrooms: 2, area: 1100, parking: true, gym: true, petFriendly: true },
    images: [{ url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800' }],
    isFeatured: true,
  },
  {
    title: 'Cozy Studio Near University', type: 'studio', price: 1200, priceType: 'monthly', status: 'rented',
    description: 'Charming studio apartment minutes from UT Austin campus. Ideal for students or young professionals.',
    location: { address: '2400 Nueces St', city: 'Austin', state: 'TX', country: 'USA', zipCode: '78705' },
    features: { bedrooms: 1, bathrooms: 1, area: 520, furnished: true },
    images: [{ url: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800' }],
    isFeatured: false,
  },
  {
    title: 'Spacious Family Home', type: 'house', price: 3500, priceType: 'monthly', status: 'approved',
    description: 'Beautiful 4-bedroom family home in quiet suburban neighborhood. Large backyard and top-rated school district.',
    location: { address: '45 Maple Ave', city: 'Scottsdale', state: 'AZ', country: 'USA', zipCode: '85251' },
    features: { bedrooms: 4, bathrooms: 3, area: 2800, parking: true, pool: true, petFriendly: true },
    images: [{ url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800' }],
    isFeatured: true,
  },
  {
    title: 'Penthouse with City Views', type: 'apartment', price: 6500, priceType: 'monthly', status: 'approved',
    description: 'Exclusive penthouse on the 40th floor with 360° city views. Rooftop terrace and concierge service.',
    location: { address: '1 Central Park West', city: 'New York', state: 'NY', country: 'USA', zipCode: '10023' },
    features: { bedrooms: 3, bathrooms: 3, area: 2400, parking: true, furnished: true, gym: true },
    images: [{ url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800' }],
    isFeatured: true,
  },
  {
    title: 'Pending Review Property', type: 'house', price: 2200, priceType: 'monthly', status: 'pending',
    description: 'Recently submitted property awaiting admin review. Lovely 3-bed home with garden.',
    location: { address: '12 Oak Street', city: 'Denver', state: 'CO', country: 'USA', zipCode: '80203' },
    features: { bedrooms: 3, bathrooms: 2, area: 1600, parking: true },
    images: [{ url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800' }],
    isFeatured: false,
  },
  {
    title: 'Commercial Office Space', type: 'commercial', price: 8500, priceType: 'monthly', status: 'approved',
    description: 'Modern open-plan office in prime business district. Suitable for 30-50 employees.',
    location: { address: '200 State St', city: 'Chicago', state: 'IL', country: 'USA', zipCode: '60601' },
    features: { bedrooms: 0, bathrooms: 4, area: 5000, parking: true, furnished: true },
    images: [{ url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800' }],
    isFeatured: false,
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('🔌 Connected to MongoDB');

  await User.deleteMany({});
  await Property.deleteMany({});

  const admin  = await User.create({ name:'Admin User',    email:'admin@gbrentals.com', password: 'admin123', role:'admin', phone:'+1-555-000-0001', isActive: true });
  const owner  = await User.create({ name:'Property Owner',email:'owner@gbrentals.com', password: 'owner123', role:'owner', phone:'+1-555-000-0002', isActive: true });
  const tenant = await User.create({ name:'John Tenant',   email:'user@gbrentals.com',  password: 'user123',  role:'user',  phone:'+1-555-000-0003', isActive: true });

  for (const prop of PROPERTIES) {
    await Property.create({ ...prop, owner: owner._id });
  }

  console.log('\n✅ Database seeded successfully!');
  console.log('─────────────────────────────');
  console.log('  Admin:  admin@gbrentals.com / admin123');
  console.log('  Owner:  owner@gbrentals.com / owner123');
  console.log('  Tenant: user@gbrentals.com  / user123');
  console.log('─────────────────────────────');
  console.log(`  Properties: ${PROPERTIES.length} created`);
  console.log('  Pending: 1, Approved: 5, Rented: 1');
  process.exit(0);
}

seed().catch(err => { console.error('❌ Seed error:', err); process.exit(1); });
