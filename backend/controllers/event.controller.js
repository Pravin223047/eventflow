import express from "express";
import dotenv from "dotenv";
import { Event } from "../models/event.model.js";

const app = express();

app.use(express.json());

dotenv.config();

export const createevent = async (req, res) => {
  try {
    const eventData = req.body;

    const newEvent = new Event({
      email: eventData.email || "",
      title: eventData.title || "",
      subtitle: eventData.subtitle || "",
      description: eventData.description || "",
      date: [
        {
          from: eventData.date?.from || "",
          to: eventData.date?.to || "",
        },
      ],
      time: eventData.time || "",
      location: Array.isArray(eventData.location)
        ? eventData.location.map((loc) => ({
            city: loc.city || "",
            state: loc.state || "",
            country: loc.country || "",
          }))
        : [],
      address: eventData.address || "",
      domain: eventData.domain || "",
      capacity: eventData.capacity || 100,
      eventImage: eventData.eventImage || "",
      eventThumbnail: eventData.eventThumbnail || "",
      eventTypeImages: eventData.eventTypeImages || [],
      personname: eventData.personname || "",
      price: {
        early: eventData.price?.early || 0,
        regular: eventData.price?.regular || 0,
        vip: eventData.price?.vip || 0,
      },
      features: Array.isArray(eventData.features)
        ? eventData.features.map((feature) => ({ text: feature }))
        : [],
      highlights: eventData.highlights || [],
      speakers: Array.isArray(eventData.speakers)
        ? eventData.speakers.map((speaker) => ({
            name: speaker.name || "",
            role: speaker.role || "",
            company: speaker.company || "",
            imageUrl: speaker.imageUrl || "",
            topic: speaker.topic || "",
            rating: speaker.rating || 0,
          }))
        : [],
      agenda: eventData.agenda || [],
      testimonials: eventData.testimonials || [],
      contact: {
        email: eventData.contact?.email || "",
        phone: eventData.contact?.phone || "",
        website: eventData.contact?.website || "",
      },
      faqs: eventData.faqs || [],
    });

    const savedEvent = await newEvent.save();

    console.log("Saved Event:", savedEvent);

    res.status(201).json({
      message: "Event added successfully",
      event: savedEvent,
    });
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getallevents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateevent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteevent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
