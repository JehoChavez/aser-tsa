const express = require("express");
const app = express();

const db = require("./models");

app.use(express.urlencoded({ extended: true }));

// Routers
const estadosRouter = require("./routes/api/Estados");
const municipiosRouter = require("./routes/api/Municipios");
const productosRouter = require("./routes/api/Productos");
app.use("/api/estados", estadosRouter);
app.use("/api/municipios", municipiosRouter);
app.use("/api/productos", productosRouter);

// Error handler
app.use((err, req, res, next) => {
  res.send("Oh boy, something went wrong!");
});

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
