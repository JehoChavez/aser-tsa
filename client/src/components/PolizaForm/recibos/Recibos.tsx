import { useContext, useEffect } from "react";
import { FormRecibosContext } from "../../../store/form-recibos-context";
import { Recibo } from "../../../types/interfaces";
import moment from "moment";
import RecibosListHeader from "./RecibosListHeader";
import ReciboListItem from "./ReciboListItem";

const Recibos = () => {
  const formRecibosContext = useContext(FormRecibosContext);

  // Calculate the number of months between each recibo and the total number of recibos.
  const calculateNrOfRecibos = () => {
    const mthsBtwnRecibos = 12 / formRecibosContext.formaPago;
    return formRecibosContext.formaPago === 1
      ? 1
      : Math.ceil(formRecibosContext.monthsDiff / mthsBtwnRecibos);
  };

  const generateRecibos = () => {
    const { primas } = formRecibosContext;
    const recibos: Recibo[] = [];
    const inicioVigencia = moment(formRecibosContext.polizaInicioVigencia);

    const subtotal =
      (primas.primaNeta + primas.financiamiento + primas.otros) /
      formRecibosContext.nrOfRecibos;

    for (let i = 0; i < formRecibosContext.nrOfRecibos; i++) {
      const reciboInicio = inicioVigencia
        .clone()
        .add((12 / formRecibosContext.formaPago) * i, "months");

      const iva =
        i === 0
          ? (subtotal + primas.expedicion / formRecibosContext.nrOfRecibos) *
            0.16
          : subtotal * 0.16;
      const primaTotal =
        i === 0
          ? (subtotal + primas.expedicion / formRecibosContext.nrOfRecibos) *
            1.16
          : subtotal * 1.16;

      const recibo: Recibo = {
        exhibicion: i + 1,
        de: formRecibosContext.nrOfRecibos,
        primaNeta: primas.primaNeta / formRecibosContext.nrOfRecibos,
        expedicion: i === 0 ? primas.expedicion : 0,
        financiamiento: primas.financiamiento / formRecibosContext.nrOfRecibos,
        otros: primas.otros / formRecibosContext.nrOfRecibos,
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
    const nr = calculateNrOfRecibos();
    formRecibosContext.setNrOfRecibos(nr);
  }, [formRecibosContext.formaPago]);

  useEffect(() => {
    const recibos = generateRecibos();
    formRecibosContext.setRecibos(recibos);
  }, [
    formRecibosContext.monthsDiff,
    formRecibosContext.formaPago,
    formRecibosContext.subtotalWoExp,
    formRecibosContext.primas,
  ]);

  useEffect(() => {
    const recibos = generateRecibos();
    formRecibosContext.setRecibos(recibos);
  }, [formRecibosContext.nrOfRecibos]);

  return (
    <div>
      <h2 className="border-b text-xl text-gray-600 font-bold">Recibos</h2>
      <RecibosListHeader />
      <div className="h-1/4 w-full bg-neutral-100 overflow-y-auto">
        {formRecibosContext.recibos.map((recibo, index) => (
          <ReciboListItem recibo={recibo} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Recibos;
