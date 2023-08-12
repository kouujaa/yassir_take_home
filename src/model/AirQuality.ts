import mongoose from "mongoose";


const AirQualitySchema = new mongoose.Schema({
    Datetime: { type: Date, default: Date.now },
    Pollution: {
      ts: String,
      aqius: Number,
      mainus: String,
      aqicn: Number,
      maincn: String,
    },
  });
  
 export const AirQuality = mongoose.model('AirQuality', AirQualitySchema);
  