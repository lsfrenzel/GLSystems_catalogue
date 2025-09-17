import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Check if DATABASE_URL is available for database connection
export const hasDatabaseUrl = !!process.env.DATABASE_URL;

// Only initialize database connection if DATABASE_URL is available
export let pool: Pool | null = null;
export let db: ReturnType<typeof drizzle> | null = null;

if (hasDatabaseUrl) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle({ client: pool, schema });
  console.log('[Database] Connected to PostgreSQL database');
} else {
  console.log('[Database] No DATABASE_URL found, using in-memory storage');
  console.log('[Database] To use PostgreSQL: Add a PostgreSQL service on Railway and set DATABASE_URL variable');
}
