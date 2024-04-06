const express = require("express");
const app = express();

const db = require("./models");

// Routers
const estadosRouter = require("./routes/api/Estados");
const municipiosRouter = require("./routes/api/Municipios");
const productosRouter = require("./routes/api/Productos");
app.use("/api/estados", estadosRouter);
app.use("/api/municipios", municipiosRouter);
app.use("/api/productos", productosRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
