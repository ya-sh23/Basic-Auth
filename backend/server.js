import express from "express";
import session from "express-session";
import cors from "cors";
import bcrypt from "bcryptjs";

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      secure: false, // Set to false for localhost
      sameSite: 'lax' // Allow cross-origin requests
    },
  })
);

let User = [];

//signup route
app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const existingUser = User.find((u) => u.username === username);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashed = await bcrypt.hash(password, 10);
    User.push({ username, password: hashed });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//login route
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = User.find((u) => u.username === username);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    req.session.user = user;
 //   console.log("Session set:", req.session.user); // Debug log
    res
      .status(200)
      .json({ message: "Login successful", user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//Dashboard route
app.get("/dashboard", (req, res) => {
 // console.log("Dashboard accessed, session:", req.session.user); // Debug log
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.status(200).json({ message: `Welcome ${req.session.user.username}` });
});

//logout route
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out successfully" });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
