const getMexicoDate = require("./getMexicoDate");

const verificarPolizaVencida = (poliza) => {
  const date = new Date(getMexicoDate());

  const reciboSinPagar = poliza.recibos.find((recibo) => {
    return !recibo.fechaPago;
  });

  if (reciboSinPagar && new Date(reciboSinPagar.fechaLimite) < date) {
    poliza.vencida = true;
  } else {
    poliza.vencida = false;
  }

  return poliza;
};

module.exports = verificarPolizaVencida;
