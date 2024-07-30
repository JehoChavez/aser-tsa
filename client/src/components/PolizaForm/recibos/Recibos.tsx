import { useContext, useEffect } from "react";
import { FormRecibosContext } from "../../../store/form-recibos-context";
import { Recibo } from "../../../types/interfaces";
import moment from "moment";

const Recibos = () => {
  const formRecibosContext = useContext(FormRecibosContext);

  // Calculate the number of months between each recibo and the total number of recibos.
  const mthsBtwnRecibos = 12 / formRecibosContext.formaPago;
  const nrOfRecibos =
    formRecibosContext.formaPago === 1
      ? 1
      : Math.ceil(formRecibosContext.monthsDiff / mthsBtwnRecibos);

  const generateRecibos = () => {
    const recibos: Recibo[] = [];
    const inicioVigencia = moment(formRecibosContext.polizaInicioVigencia);

    for (let i = 0; i < nrOfRecibos; i++) {
      const reciboInicio = inicioVigencia
        .clone()
        .add(mthsBtwnRecibos * i, "months");

      const recibo: Recibo = {
        exhibicion: i + 1,
        de: nrOfRecibos,
        primaTotal: 100, // Placeholder amount, replace with actual logic if necessary
        fechaInicio: reciboInicio.format("YYYY-MM-DD"),
        fechaLimite: reciboInicio
          .clone()
          .add(formRecibosContext.aseguradora.plazoPrimer || 0, "days")
          .format("YYYY-MM-DD"),
      };

      recibos.push(recibo);
    }

    return recibos;
  };

  useEffect(() => {
    const recibos = generateRecibos();
    console.log(recibos);
    formRecibosContext.setRecibos(recibos);
  }, [formRecibosContext.monthsDiff, formRecibosContext.formaPago]);

  return (
    <div>
      <h2>Recibos</h2>
      <ul>
        {formRecibosContext.recibos.map((recibo, index) => (
          <li key={index}>
            Exhibición: {recibo.exhibicion} de {recibo.de}, Monto:{" "}
            {recibo.primaTotal}, Inicio: {recibo.fechaInicio}, Límite:{" "}
            {recibo.fechaLimite}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recibos;
