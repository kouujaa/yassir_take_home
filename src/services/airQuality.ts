import axios from "axios";
import { createTypedLogger, env } from "../helpers";
import { AirQuality } from "../models";

const IQAIR_API_KEY = env("iq_air_api_key");
const logger = createTypedLogger("src/service/airQuality.ts");

export const getMostPollutedTime = async () => await AirQuality.findOne().sort(
        "-pollution.aqius"
      );


interface AirQualityData {
    latitude: string;
    longitude: string;
}

export const getAirQuality = async ({ latitude, longitude }: AirQualityData) => {
    try {
        if (!longitude || !latitude) {
            logger.error({
              msg: "path: /getAirQuality - Error fetching or saving air quality data:",
              error: "No longitude or latitude provided.",
            });
            return { error: "No longitude or latitude provided." };
        }

        const response = await axios.get(
            `https://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${IQAIR_API_KEY}`
          );
          logger.info({ msg: JSON.stringify(response.data) });
          const airQualityData = response.data.data;
          return {
            Result: {
              Pollution: {
                ts: airQualityData.current.pollution.ts,
                aqius: airQualityData.current.pollution.aqius,
                mainus: airQualityData.current.pollution.mainus,
                aqicn: airQualityData.current.pollution.aqicn,
                maincn: airQualityData.current.pollution.maincn,
              },
            },
          }; 
 
    } catch (error) {
        logger.error({
            msg: "path: /getAirQuality - Error fetching or saving air quality data:",
            error,
          });
          return { error: "An error occurred while fetching air quality data." };
        
    }

}