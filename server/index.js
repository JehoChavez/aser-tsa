const express = require("express");
const app = express();
const cron = require("node-cron");
const ExpressError = require("./utils/ExpressError");
const CustomResponse = require("./utils/CustomResponse");
const markPolizasVencidas = require("./utils/markPolizasVencidas");

const db = require("./models");

cron.schedule(
  "0 0 * * *",
  () => {
    console.log("Marcando polizas vencidas");
    markPolizasVencidas();
  },
  {
    scheduled: true,
    timezone: "America/Mexico_City",
  }
);

app.use(express.urlencoded({ extended: true }));

// Routers
const estadosRouter = require("./routes/api/estados");
const ramosRouter = require("./routes/api/ramos");
const aseguradorasRouter = require("./routes/api/aseguradoras");
const agentesRouter = require("./routes/api/agentes");
const vendedoresRouter = require("./routes/api/vendedores");
const clientesRouter = require("./routes/api/clientes");
const polizasRouter = require("./routes/api/polizas");
const endososRouter = require("./routes/api/endosos");
const recibosRouter = require("./routes/api/recibos");
app.use("/api/estados", estadosRouter);
app.use("/api/ramos", ramosRouter);
app.use("/api/aseguradoras", aseguradorasRouter);
app.use("/api/agentes", agentesRouter);
app.use("/api/vendedores", vendedoresRouter);
app.use("/api/clientes", clientesRouter);
app.use("/api/polizas", polizasRouter);
app.use("/api/endosos", endososRouter);
app.use("/api/recibos", recibosRouter);

// Handling not specified routes
app.all("*", (req, res, next) => {
  next(new ExpressError("Not Found", 404));
});

// Error handler
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  const response = new CustomResponse([], message, status);
  res.status(status).send(response);
});

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
