import express from "express";
import {
  createevent,
  deleteevent,
  getallevents,
  updateevent,
} from "../controllers/event.controller.js";

const router = express.Router();

router.post("/", createevent);
router.get("/getevents", getallevents);
router.put("/:id", updateevent);

router.delete("/:id", deleteevent);

export default router;
