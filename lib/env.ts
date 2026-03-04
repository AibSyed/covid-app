import { z } from "zod";

const envSchema = z.object({
  HEALTH_PRIMARY_BASE_URL: z.string().url().default("https://disease.sh"),
  HEALTH_ALL_PATH: z.string().default("/v3/covid-19/all"),
  HEALTH_COUNTRIES_PATH: z.string().default("/v3/covid-19/countries?allowNull=false"),
});

export const env = envSchema.parse({
  HEALTH_PRIMARY_BASE_URL: process.env.HEALTH_PRIMARY_BASE_URL,
  HEALTH_ALL_PATH: process.env.HEALTH_ALL_PATH,
  HEALTH_COUNTRIES_PATH: process.env.HEALTH_COUNTRIES_PATH,
});
