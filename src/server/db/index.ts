import "server-only";

import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

import { env } from "@/env";
import * as schema from "@/server/db/schema";

let dbInstance: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (!dbInstance) {
    dbInstance = drizzle(new Pool({ connectionString: env.DATABASE_URL }), {
      schema,
    });
  }

  return dbInstance;
}

export const db = getDb();
