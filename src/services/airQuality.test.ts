import request from "supertest";
import app from "../server";


describe("GET /air-quality", () => {
    it("should return air quality data", async () => {
      const longitude = 2.3488;
      const latitude = 48.8534;
      const response = await request(app).get("/iqAir/air-quality").query({longitude, latitude});
      expect(response.statusCode).toBe(200);
      expect(response.body.Result).toHaveProperty("Pollution");
    });
  
    it("should return an error if no latitude or longitude is provided", async () => {
      const response = await request(app).get("/iqAir/air-quality");
      expect(response.status).toBe(500);
      expect(response.body.error).toBe(
        "No longitude or latitude provided."
      );
    })

    it("should return an error if no latitude is provided", async () => {
      const longitude = 2.3488;
      const response = await request(app).get("/iqAir/air-quality").query({longitude});
      expect(response.status).toBe(500);
      expect(response.body.error).toBe(
        "No longitude or latitude provided."
      );
    })

    it("should return an error if no longitude is provided", async () => {
      const latitude = 48.8534;
      const response = await request(app).get("/iqAir/air-quality").query({latitude});
      expect(response.status).toBe(500);
      expect(response.body.error).toBe(
        "No longitude or latitude provided."
      );
    })
  })
  
  describe("GET /most-polluted-zone", () => {
    it("should return the datetime of the most polluted zone", async () => {
      const response = await request(app).get("/iqAir/most-polluted-zone");
      expect(response.statusCode).toBe(200);
      expect(response.body.Datetime).toBeDefined();
    })
  })