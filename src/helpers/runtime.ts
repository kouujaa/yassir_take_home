import dotenv from "dotenv";
dotenv.config();

const ENVIRONMENT_VARIABLES = {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  iq_air_api_key: process.env.IQAIR_API_KEY,
  cron_schedule: process.env.CRON_JOB_SCHEDULE,
};

export const env = (key: keyof typeof ENVIRONMENT_VARIABLES) => {
  return ENVIRONMENT_VARIABLES[key];
};