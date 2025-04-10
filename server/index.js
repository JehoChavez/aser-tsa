const express = require("express");
const app = express();
const cron = require("node-cron");
const session = require("express-session");
const cors = require("cors");
const helmet = require("helmet");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const CustomResponse = require("./utils/CustomResponse");
const markPolizasVencidas = require("./utils/markPolizasVencidas");
const deleteOldPolizas = require("./utils/deleteOldPolizas");
const isAuthenticated = require("./utils/isAuthenticated");
const path = require("path");

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "PUT", "GET", "PATCH", "DELETE", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

require("dotenv").config();

const db = require("./models");

// Scheduled tasks to be executed every midnight
cron.schedule(
  "0 0 * * *",
  () => {
    // Mark expired polizas
    console.log("Marcando polizas vencidas");
    markPolizasVencidas();

    // Delete old polizas
    console.log("Eliminado polizas antiguas");
    deleteOldPolizas();
  },
  {
    scheduled: true,
    timezone: "America/Mexico_City",
  }
);

// Use sequelize to store session info
const sessionStore = new SequelizeStore({
  db: db.sequelize,
  checkExpirationInterval: 1000 * 60 * 60 * 6,
  expiration: 1000 * 60 * 60 * 3,
});

sessionStore.sync();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true if using https
      maxAge: 1000 * 60 * 60 * 3,
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Check if is authenticated when hitting every /api route
app.use("/api", isAuthenticated);

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
const pendientesRouter = require("./routes/api/pendientes");
const reporteRouter = require("./routes/api/reporte");
const authRouter = require("./routes/auth");
app.use("/api/estados", estadosRouter);
app.use("/api/ramos", ramosRouter);
app.use("/api/aseguradoras", aseguradorasRouter);
app.use("/api/agentes", agentesRouter);
app.use("/api/vendedores", vendedoresRouter);
app.use("/api/clientes", clientesRouter);
app.use("/api/polizas", polizasRouter);
app.use("/api/endosos", endososRouter);
app.use("/api/recibos", recibosRouter);
app.use("/api/pendientes", pendientesRouter);
app.use("/api/reporte", reporteRouter);
app.use("/auth", authRouter);

app.use(express.static(path.join(__dirname, "../client/dist")));

// Serve the frontend
app.all("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Error handler
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  const response = new CustomResponse([], message, status);
  res.status(status).send(response);
});

db.sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
