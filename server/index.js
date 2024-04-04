const express = require("express");
const app = express();

const db = require("./models");

// Routers
const estadosRouter = require("./routes/api/Estados");
app.use("/api/estados", estadosRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
