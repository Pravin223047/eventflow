import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/map"
    : "/api/map";

axios.defaults.withCredentials = true;

interface MapState {
  error: string | null;
  message: string | null;
  data: any;
}

interface MapActions {
  getCountries: () => Promise<any>;
  getStates: (countryCode: string) => Promise<any>;
  getCities: (countryCode: string, stateCode: string) => Promise<any>;
}

export const useMapStore = create<MapState & MapActions>((set) => ({
  error: null,
  message: null,
  data: null,
  getCountries: async () => {
    try {
      const response = await axios.get(`${API_URL}/countries`);
      set({ data: response.data, message: null, error: null });
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error getting countries";
      set({ error: errorMessage, message: null });
      throw new Error(errorMessage);
    }
  },

  getStates: async (countryCode: string) => {
    try {
      const response = await axios.get(
        `${API_URL}/countries/${countryCode}/states`
      );
      set({ data: response.data, message: null, error: null });
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error getting states";
      set({ error: errorMessage, message: null });
      throw new Error(errorMessage);
    }
  },

  getCities: async (countryCode: string, stateCode: string) => {
    try {
      const response = await axios.get(
        `${API_URL}/countries/${countryCode}/states/${stateCode}/cities`
      );
      set({ data: response.data, message: null, error: null });
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error getting cities";
      set({ error: errorMessage, message: null });
      throw new Error(errorMessage);
    }
  },
}));
