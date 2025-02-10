import { create } from "zustand";
import axios from "axios";
import { Event } from "@/types";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/event"
    : "/api/event";

interface EventAction {
  events: Event[];
  isLoading: boolean;
  error: string | null;
  message: string | null;

  fetchEvents: () => Promise<void>;
  addEvent: (eventData: Omit<Event, "_id">) => Promise<Event | null>;
  updateEvent: (
    eventId: string,
    eventData: Partial<Event>
  ) => Promise<Event | null>;
  deleteEvent: (eventId: string) => Promise<void>;
}

const useEventStore = create<EventAction>((set) => ({
  events: [],
  isLoading: false,
  error: null,
  message: null,

  fetchEvents: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<Event[]>(`${API_URL}/getevents`);

      const validEvents = response.data.filter((event) => event._id);

      set({ events: validEvents, isLoading: false });
    } catch (error) {
      const errMsg =
        error instanceof Error ? error.message : "Error fetching events";
      set({ isLoading: false, error: errMsg });
    }
  },

  addEvent: async (eventData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}`, eventData, {
        headers: { "Content-Type": "application/json" },
      });

      const event = response.data.event;

      if (!event || !event._id) {
        throw new Error("Invalid event data: Missing _id");
      }

      set((state) => ({
        events: [...state.events, event],
        isLoading: false,
      }));

      return event;
    } catch (error) {
      console.error("Error in addEvent:", error);

      const errMsg =
        axios.isAxiosError(error) && error.response
          ? error.response.data?.message || error.message
          : "Error adding event";

      set({ isLoading: false, error: errMsg });
      return null;
    }
  },

  updateEvent: async (eventId, eventData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put<Event>(
        `${API_URL}/${eventId}`,
        eventData
      );

      if (!response.data._id)
        throw new Error("Invalid event data: Missing _id");

      set((state) => ({
        events: state.events.map((event) =>
          event._id === eventId ? response.data : event
        ),
        message: "Event updated successfully",
        isLoading: false,
      }));

      return response.data;
    } catch (error) {
      const errMsg =
        error instanceof Error ? error.message : "Error updating event";
      set({ isLoading: false, error: errMsg });
      return null;
    }
  },

  deleteEvent: async (eventId) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_URL}/${eventId}`);
      set((state) => ({
        events: state.events.filter((event) => event._id !== eventId),
        message: "Event deleted successfully",
        isLoading: false,
      }));
    } catch (error) {
      const errMsg =
        error instanceof Error ? error.message : "Error deleting event";
      set({ isLoading: false, error: errMsg });
    }
  },
}));

export default useEventStore;
