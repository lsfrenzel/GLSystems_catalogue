import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

// Check if DATABASE_URL is available for database connection
export const hasDatabaseUrl = !!process.env.DATABASE_URL;

// Only initialize database connection if DATABASE_URL is available
export let pool: Pool | null = null;
export let db: ReturnType<typeof drizzle> | null = null;

if (hasDatabaseUrl) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle(pool, { schema });
  console.log('[Database] Connected to PostgreSQL database');
} else {
  console.log('[Database] No DATABASE_URL found, using in-memory storage');
  console.log('[Database] To use PostgreSQL: Add a PostgreSQL service on Railway and set DATABASE_URL variable');
}
