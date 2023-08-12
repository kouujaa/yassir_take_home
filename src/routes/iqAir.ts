import express from "express";
import { createTypedLogger } from "../helpers";
import { getAirQuality, getMostPollutedTime } from "../service/airQuality";

const router = express.Router();
const logger = createTypedLogger("src/api/iqAir.ts");

router.get("/air-quality", async (req, res) => {
  const { longitude, latitude } = req.query;

  try {

  // error handling
  if (!longitude || !latitude) {
    logger.error({
      msg: "path: /air-quality - Error fetching or saving air quality data:",
      error: "No longitude or latitude provided.",
    });
    res
      .status(500)
      .json({ error: "No longitude or latitude provided." });
  } else {
    const result = await getAirQuality({latitude: latitude.toString(), longitude: longitude.toString()})

    logger.info({
      msg: "path: /air-quality - Air quality data fetched:",
      result,
    });
    res.status(200).json(result);
  }
  } catch (error) {
    logger.error({
      msg: "path: /air-quality - Error fetching or saving air quality data:",
      error,
    });
    res
      .status(500)
      .json({ error: "An error occurred while fetching air quality data." });
  }
});

router.get("/most-polluted-zone", async (req, res) => {
  try {
    const mostPollutedEntry = await getMostPollutedTime()
    logger.info({
      msg: "path: /most-polluted-zone - Most polluted zone data fetched:",
      mostPollutedEntry,
    });
    res.json({ Datetime: mostPollutedEntry.Datetime });
  } catch (error) {
    logger.error({
      msg:
        "path: /most-polluted-zone - Error fetching or saving air quality data:",
      error,
    });
    res
      .status(500)
      .json({
        error: "An error occurred while fetching most polluted zone data.",
      });
  }
});

export default router;