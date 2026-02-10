import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { serverConfig } from "./config.tsx";

const app = new Hono();

// Set environment variables for Supabase client
Deno.env.set("SUPABASE_URL", serverConfig.supabaseUrl);
Deno.env.set("SUPABASE_SERVICE_ROLE_KEY", serverConfig.supabaseServiceRoleKey);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-d2f83652/health", (c) => {
  return c.json({ status: "ok" });
});

// Contact form submission endpoint
app.post("/make-server-d2f83652/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return c.json({ error: "Name, email, and message are required" }, 400);
    }

    // Create a unique key for each submission using timestamp and email
    const timestamp = new Date().toISOString();
    const key = `contact:${Date.now()}:${email}`;

    // Store the contact form submission
    await kv.set(key, {
      name,
      email,
      phone: phone || null,
      message,
      timestamp,
      status: 'new',
    });

    console.log(`Contact form submission stored: ${key}`);

    return c.json({ 
      success: true, 
      message: "Dziękujemy za wiadomość! Skontaktujemy się wkrótce." 
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return c.json({ 
      error: "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie." 
    }, 500);
  }
});

Deno.serve(app.fetch);