require("dotenv").config();
const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const bcrypt = require("bcrypt");

app.use(express.static(path.join(__dirname, "frontend")));


// Middleware to read form data (important)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Express server is running");
});


//Signup route(for creating new users)
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10); // 10 is salt rounds

  console.log("Email:", email);
  console.log("Hashed password:", hashedPassword);
  const { data, error } = await supabase
    .from("users")
    .insert([{ email, password: hashedPassword }]);

  if (error) {
    console.error(error);
    return res.status(400).send("User already exists or error occurred");
  }

  res.send("Signup successful!");
});


// Login route (we'll improve this later)
app.post("/login", (req, res) => {
  console.log(req.body);
  res.sendFile(path.join(__dirname, 'frontend', 'google-login.html'));
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

