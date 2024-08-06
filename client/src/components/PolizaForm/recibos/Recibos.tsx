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
    const { primas } = formRecibosContext;
    const recibos: Recibo[] = [];
    const inicioVigencia = moment(formRecibosContext.polizaInicioVigencia);

    const subtotal =
      (primas.primaNeta + primas.financiamiento + primas.otros) / nrOfRecibos;

    for (let i = 0; i < nrOfRecibos; i++) {
      const reciboInicio = inicioVigencia
        .clone()
        .add(mthsBtwnRecibos * i, "months");

      const iva =
        i === 0
          ? (subtotal + primas.expedicion / nrOfRecibos) * 0.16
          : subtotal * 0.16;
      const primaTotal =
        i === 0
          ? (subtotal + primas.expedicion / nrOfRecibos) * 1.16
          : subtotal * 1.16;

      const recibo: Recibo = {
        exhibicion: i + 1,
        de: nrOfRecibos,
        primaNeta: primas.primaNeta / nrOfRecibos,
        expedicion: i === 0 ? primas.expedicion : 0,
        financiamiento: primas.financiamiento / nrOfRecibos,
        otros: primas.otros / nrOfRecibos,
        iva: iva,
        primaTotal: primaTotal,
        fechaInicio: reciboInicio.format("YYYY-MM-DD"),
        fechaLimite: reciboInicio
          .clone()
          .add(
            i === 0
              ? formRecibosContext.aseguradora.plazoPrimer || 0
              : formRecibosContext.aseguradora.plazoSubsecuentes || 0,
            "days"
          )
          .format("YYYY-MM-DD"),
      };

      recibos.push(recibo);
    }

    return recibos;
  };

  useEffect(() => {
    const recibos = generateRecibos();
    formRecibosContext.setRecibos(recibos);
  }, [
    formRecibosContext.monthsDiff,
    formRecibosContext.formaPago,
    formRecibosContext.subtotalWoExp,
    formRecibosContext.primas,
  ]);
  console.log(formRecibosContext.recibos);

  return (
    <div>
      <h2 className="border-b text-xl text-gray-600 font-bold">Recibos</h2>
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
