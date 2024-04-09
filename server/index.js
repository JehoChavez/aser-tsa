const express = require("express");
const app = express();
const ExpressError = require("./utils/ExpressError");

const db = require("./models");

app.use(express.urlencoded({ extended: true }));

// Routers
const estadosRouter = require("./routes/api/Estados");
const municipiosRouter = require("./routes/api/Municipios");
const productosRouter = require("./routes/api/Productos");
app.use("/api/estados", estadosRouter);
app.use("/api/municipios", municipiosRouter);
app.use("/api/productos", productosRouter);

// Handling not specified routes
app.all("*", (req, res, next) => {
  next(new ExpressError("Not Found", 404));
});

// Error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).send(message);
});

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
