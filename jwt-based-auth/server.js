import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 4000;
app.use(express.json());

const JWT_SECRET = "JaCK*4^";

let User = [];
let blackListToken = [];

//signup
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  const existingUser = User.find((u) => u.username === username);
  if (existingUser) {
    res.status(400).send("User already exists");
  }
  const hashed = bcrypt.hashSync(password, 8);
  User.push({ username, password: hashed });
  res.send("Signup successful ✅");
});

//login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = User.find((u) => u.username === username);
  if (!user) res.status(401).send("Invalid credentials");

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) res.status(401).send("Invalid Credentials");

  const token = jwt.sign({ username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.send({ message: "Login successful ✅", token });
});

//middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).send("Access Denied");

  if (blackListToken.includes(token)) {
    return res.status(401).send("Access Denied");
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid Token");
    }
    req.user = user;
    next();
  });
}

//dashboard
app.get("/dashboard", authenticateToken, (req, res) => {
  res.send(`Welcome ${req.user.username},welcome to your dashboard 🚀`);
});

//logout
app.post("/logout", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) res.status(400).send("No token provided");

  blackListToken.push(token);
  res.send("Logout successful ✅");
});

app.get("/", (req, res) => {
  res.send("Welcome to jwt auth");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
