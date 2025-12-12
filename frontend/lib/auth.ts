import { betterAuth } from "better-auth";
import { Pool } from "pg";

// Test database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test connectionA
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Database connected:", res.rows[0]);
  }
});

export const auth = betterAuth({
  database: pool,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  logger: {
    level: "debug", // Enable detailed logging
  },
});