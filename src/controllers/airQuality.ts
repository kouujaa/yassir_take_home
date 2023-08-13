import express from "express";
import { createTypedLogger } from "../helpers";
import { getAirQuality, getMostPollutedTime } from "../services/airQuality";

const logger = createTypedLogger("src/controllers/iqAir.ts");

const getAirQualityContoller = async (
  req: express.Request,
  res: express.Response
) => {
  const { longitude, latitude } = req.query;

  try {
    if (!longitude || !latitude) {
      logger.error({
        msg: "function: getAirQualityContoller - Error fetching or saving air quality data:",
        error: "No longitude or latitude provided.",
      });
      res.status(500).json({ error: "No longitude or latitude provided." });
    } else {
      const result = await getAirQuality({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
      });

      logger.info({
        msg: "function: getAirQualityContoller - Air quality data fetched:",
        result,
      });
      res.status(200).json(result);
    }
  } catch (error) {
    logger.error({
      msg: "function: getAirQualityContoller - Error fetching or saving air quality data:",
      error,
    });
    res
      .status(500)
      .json({ error: "An error occurred while fetching air quality data." });
  }
};

const getMostPollutedTimeController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const mostPollutedEntry = await getMostPollutedTime();
    logger.info({
      msg: "function: getMostPollutedTimeController - Most polluted zone data fetched:",
      mostPollutedEntry,
    });
    res.status(200).json({ Datetime: mostPollutedEntry.Datetime });
  } catch (error) {
    logger.error({
      msg:
        "function: getMostPollutedTimeController - Error fetching or saving air quality data:",
      error,
    });
    res.status(500).json({
      error: "An error occurred while fetching most polluted zone data.",
    });
  }
};

export { getAirQualityContoller, getMostPollutedTimeController };
