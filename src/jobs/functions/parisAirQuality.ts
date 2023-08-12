import axios from "axios";
import { createTypedLogger, env } from "../../helpers";
import { AirQuality } from "../../model";

const logger = createTypedLogger("src/job/paris_air_quality.ts");

export const parisAirQualityJob = async () => {
  const IQAIR_API_KEY = env("iq_air_api_key");
  const latitude = 48.856613;
  const longitude = 2.352222;

  try {
    const response = await axios.get(`https://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${IQAIR_API_KEY}`);
    const airQualityData = response.data.data;

    const newAirQuality = new AirQuality({
      Pollution: {
        ts: airQualityData.current.pollution.ts,
        aqius: airQualityData.current.pollution.aqius,
        mainus: airQualityData.current.pollution.mainus,
        aqicn: airQualityData.current.pollution.aqicn,
        maincn: airQualityData.current.pollution.maincn,
      },
    });

    await newAirQuality.save();
    console.log('Air quality data saved:', airQualityData);
    console.log('Air quality data saved:', newAirQuality);
  } catch (error) {
    console.error('Error fetching or saving air quality data:', error);
  }
}