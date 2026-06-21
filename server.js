const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", require("./routes/applicationRoutes"));

app.get("/", (req, res) => {
  res.json({
    message: "PlaceMux Application Funnel API"
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});