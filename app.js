
const express = require("express");
const path = require("path");
const itemRouter = require("./routes/itemRouter");
const categoryRouter = require("./routes/categoryRouter");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", itemRouter);
app.use("/", categoryRouter);

app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Pulse Tech warehouse running on port http://localhost:${PORT} ... `);
});