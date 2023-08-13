import express from "express";
import { getAirQualityContoller, getMostPollutedTimeController } from "../controllers/airQuality";

const router = express.Router();

router.get("/air-quality", getAirQualityContoller);
router.get("/most-polluted-zone", getMostPollutedTimeController);

export { router as airQualityRouter };
