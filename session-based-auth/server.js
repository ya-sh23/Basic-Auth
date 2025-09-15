import express from "express";
import bcrypt from "bcryptjs";
import session from "express-session";

const app = express();
const PORT = 4000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "Alex213",
    resave: false,
    saveUninitialized: false,
  })
);

let Users = [];

//signup
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  const existingUser = Users.find((u) => u.username === username);
  if (existingUser) res.status(400).send("User already exists");

  const hash = bcrypt.hashSync(password, 8);
  Users.push({ username, password: hash });
  res.send("Signup successful ✅");
});

//login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = Users.find((u) => u.username === username);

  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.user = { username };
    res.send("Login successful ✅");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// protected dashboard
app.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.send(`Hey! ${req.session.user.username}, Welcome to Dashboard`);
  } else {
    res.status(401).send("Please login to access this page");
  }
});

//logout
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.send("Logged out successfully ✅");
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to the home page!!");
});

app.listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});
