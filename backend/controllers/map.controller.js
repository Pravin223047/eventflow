import express from "express";
import axios from "axios";
import dotenv from "dotenv";
const app = express();

// Middleware
app.use(express.json());

dotenv.config();

export const countries = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.countrystatecity.in/v1/countries",
      {
        headers: { "X-CSCAPI-KEY": process.env.MAP_API_KEY },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to load countries." });
  }
};

// Route to get states by country
export const states = async (req, res) => {
  try {
    const countryCode = req.params.countryCode;
    const response = await axios.get(
      `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
      {
        headers: { "X-CSCAPI-KEY": process.env.MAP_API_KEY },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to load states." });
  }
};

// Route to get cities by state
export const cities = async (req, res) => {
  try {
    const { countryCode, stateCode } = req.params;
    const response = await axios.get(
      `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
      {
        headers: { "X-CSCAPI-KEY": process.env.MAP_API_KEY },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to load cities." });
  }
};
