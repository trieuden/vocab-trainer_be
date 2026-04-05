import { join } from "node:path";
import type { TypeOrmModuleOptions } from "@nestjs/typeorm";

function envDbSynchronize(): boolean {
  const v = process.env.DB_SYNCHRONIZE?.trim().toLowerCase();
  if (v === undefined || v === "") return true;
  return v === "true" || v === "1" || v === "yes" || v === "on";
}

export function getTypeOrmConfig(): TypeOrmModuleOptions {
  return {
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number.parseInt(process.env.DB_PORT || "5432", 10),
    username: process.env.DB_USERNAME || "vocab_trainer",
    password: process.env.DB_PASSWORD || "123456",
    database: process.env.DB_NAME || "vocab_trainer",
    entities: [join(__dirname, "..", "entities", "*.entity{.ts,.js}")],
    synchronize: envDbSynchronize(),
    logging: true,
  };
}
