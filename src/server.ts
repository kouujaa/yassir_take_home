// packages

import express from "express";
import cron from "node-cron";
import mongoose from 'mongoose';
import morgan from "morgan";

// local
import { createTypedLogger, env } from "./helpers";
import { parisAirQualityJob } from "./jobs";
import {airQualityRouter} from "./routes";
const logger = createTypedLogger("src/server.ts");


const port = env("port") || 5000;
const db_url = env("db_url");
 const cron_schedule = env("cron_schedule");


async function main() {
  await mongoose.connect(db_url);
}

  const app = express();

  /*********************
   * MIDDLEWARES
   * *******************/
  app.use(morgan("tiny"));
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  
  /*********************
   * CRON JOBS
   * *******************/
 cron.schedule(cron_schedule, parisAirQualityJob);

  /*********************
   * REST API
   * *******************/
  app.use(`/iqAir`, airQualityRouter);
  app.get(`/`, (req, res) => {
    res.send("Hello World!");
  });

  main().then(() => logger.info('DB Connected!')).catch(err => {
    logger.error({msg: 'DB Connection Error: ', err});
})

 app.listen({ port }, () => {
  logger.info({msg: `Server listening on port ${port}`});
  logger.info({msg: `Server ready at http://localhost:${port}`});
})


export default app;


