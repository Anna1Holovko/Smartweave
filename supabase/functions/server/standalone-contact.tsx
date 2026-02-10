import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Get Supabase credentials from environment
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "https://mpokyroyyqxhxlkofluc.supabase.co";
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

// Create Supabase client with SERVICE_ROLE_KEY (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS
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

// Health check
app.get("/make-server-d2f83652/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Contact form submission
app.post("/make-server-d2f83652/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return c.json({ error: "Name, email, and message are required" }, 400);
    }

    // Create a unique key
    const timestamp = new Date().toISOString();
    const key = `contact:${Date.now()}:${email}`;

    // Store in kv_store_d2f83652 table using SERVICE_ROLE_KEY
    const { data, error } = await supabase
      .from('kv_store_d2f83652')
      .insert({
        key: key,
        value: {
          name,
          email,
          phone: phone || null,
          message,
          timestamp,
          status: 'new',
        },
      });

    if (error) {
      console.error("Database error:", error);
      throw error;
    }

    console.log(`✅ Contact form submission stored: ${key}`);

    return c.json({ 
      success: true, 
      message: "Dziękujemy za wiadomość! Skontaktujemy się wkrótce." 
    });
  } catch (error: any) {
    console.error("Error processing contact form:", error);
    return c.json({ 
      error: `Wystąpił błąd: ${error.message}`,
      details: error.toString()
    }, 500);
  }
});

// Catch all
app.all("*", (c) => {
  return c.json({ error: "Not found", path: c.req.url }, 404);
});

Deno.serve(app.fetch);
