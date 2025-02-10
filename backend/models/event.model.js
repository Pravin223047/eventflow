import mongoose from "mongoose";

const FeatureSchema = new mongoose.Schema({
  text: String,
});

const SpeakerSchema = new mongoose.Schema({
  name: String,
  role: String,
  company: String,
  imageUrl: String,
  topic: String,
  rating: Number,
});

const AgendaSchema = new mongoose.Schema({
  time: String,
  title: String,
  description: String,
  icon: String,
});

const TestimonialSchema = new mongoose.Schema({
  text: String,
  author: String,
  role: String,
});

const FAQSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const ContactSchema = new mongoose.Schema({
  email: String,
  phone: String,
  website: String,
});

const PriceSchema = new mongoose.Schema({
  early: Number,
  regular: Number,
  vip: Number,
});

const LocationSchema = new mongoose.Schema({
  city: String,
  state: String,
  country: String,
});

const DateSchema = new mongoose.Schema({
  from: String,
  to: String,
});

const EventSchema = new mongoose.Schema(
  {
    email: String,
    title: String,
    subtitle: String,
    description: String,
    date: [DateSchema],
    time: String,
    location: [LocationSchema],
    address: String,
    domain: String,
    capacity: Number,
    eventImage: String,
    eventThumbnail: String,
    eventTypeImages: [String],
    personname: String,
    price: PriceSchema,
    features: [FeatureSchema],
    highlights: [String],
    speakers: [SpeakerSchema],
    agenda: [AgendaSchema],
    testimonials: [TestimonialSchema],
    contact: ContactSchema,
    faqs: [FAQSchema],
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", EventSchema);
