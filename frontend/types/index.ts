export interface Property {
  _id: string;
  title: string;
  description: string;
  type: 'apartment' | 'house' | 'villa' | 'studio' | 'commercial';
  status: 'pending' | 'approved' | 'rejected' | 'rented' | 'sold';
  price: number;
  priceType: 'total' | 'monthly' | 'yearly';
  location: {
    address: string;
    city: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    area?: number;
    parking?: boolean;
    furnished?: boolean;
    petFriendly?: boolean;
    pool?: boolean;
    gym?: boolean;
  };
  images: { url: string; publicId?: string }[];
  owner: { _id: string; name: string; email: string; phone?: string };
  availableFrom?: string;
  availableTo?: string;
  isFeatured?: boolean;
  views?: number;
  inquiryCount?: number;
  rejectedReason?: string;
  createdAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'owner' | 'admin';
  phone?: string;
  isActive?: boolean;
  favorites?: string[];
  createdAt?: string;
}

export interface Inquiry {
  _id: string;
  property: Property;
  sender: User;
  owner: User;
  message: string;
  phone?: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  reply?: string;
  repliedAt?: string;
  createdAt: string;
}
