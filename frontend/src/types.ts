interface Feature {
  text: string;
}

interface Speaker {
  name: string;
  role: string;
  company: string;
  imageUrl: string;
  topic: string;
  rating: number;
}

export interface Agenda {
  time: string;
  title: string;
  description: string;
  icon: string;
}

interface Testimonial {
  text: string;
  author: string;
  role: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Contact {
  email: string;
  phone: string;
  website: string;
}

interface Price {
  early: number;
  regular: number;
  vip: number;
}

interface Location {
  city: string;
  state: string;
  country: string;
}

export interface EventDate {
  from: any;
  [index: number]: {
    from: Date;
    to: Date;
  };
}

export interface Event {
  success: Event | null;
  _id: string;
  email: string;
  title: string;
  subtitle: string;
  description: string;
  date: EventDate[];
  time: string;
  location: Location[];
  address: string;
  domain: string;
  capacity: number;
  eventImage: string;
  eventThumbnail: string;
  eventTypeImages: string[];
  personname: string;
  price: Price;
  features: Feature[];
  highlights: string[];
  speakers: Speaker[];
  agenda: Agenda[];
  testimonials: Testimonial[];
  contact: Contact;
  faqs: FAQ[];
  updatedAt: Date;
  createdAt: Date;
}
