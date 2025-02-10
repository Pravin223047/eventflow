import express from "express";
import { cities, countries, states } from "../controllers/map.controller.js";

const router = express.Router();

router.get("/countries", countries);
router.get("/countries/:countryCode/states", states);
router.get("/countries/:countryCode/states/:stateCode/cities", cities);

export default router;
