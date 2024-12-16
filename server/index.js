const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// load notification
require("./utils/notifications");

// create express app
const app = express();
// middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// setup static files
app.use("/uploads", express.static("uploads"));

// routes
app.get("/", (_, res) => {
  res.redirect(process.env.CLIENT_URL);
});

// role base authenticate middleware
const authenticateToken = (roles) => {
  return (req, res, next) => {
    const token = req.cookies?.access_token;
    if (token == null) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      if (!roles.includes(user.role))
        return res.status(403).json({ message: "Forbidden" });
      req.user = user;
      next();
    });
  };
};

// optional authenticate middleware
const authenticateOptional = (req, res, next) => {
  const token = req.cookies?.access_token;
  if (token == null) return next();
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return next();
    req.user = user;
    next();
  });
};

// auth routes
app.use("/auth", require("./routes/auth"));

// public routes
app.use("/public", authenticateOptional, require("./routes/public"));

// user auth routes
app.use(
  "/user",
  authenticateToken(["CLIENT", "BEAUTICIAN", "ADMIN"]),
  require("./routes/user")
);

// client routes
app.use("/client", authenticateToken(["CLIENT"]), require("./routes/client"));

// beautician routes
app.use(
  "/beautician",
  authenticateToken(["BEAUTICIAN"]),
  require("./routes/beautician")
);

// admin routes
app.use("/admin", authenticateToken(["ADMIN"]), require("./routes/admin"));

// server run on port 8000 or env port
const port = process.env.PORT || 8000;
// listen to port
app.listen(port, () => {
  console.log("Server is running on port 8000");
});
