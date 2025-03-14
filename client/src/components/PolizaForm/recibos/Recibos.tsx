import { useContext, useEffect } from "react";
import { FormRecibosContext } from "../../../store/form-recibos-context";
import { Recibo } from "../../../types/interfaces";
import moment from "moment";
import RecibosListHeader from "./RecibosListHeader";
import ReciboListItem from "./ReciboListItem";

const Recibos = ({ endoso }: { endoso?: boolean }) => {
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

    const endosoInicioVigencia = endoso
      ? moment(formRecibosContext.endosoInicioVigencia)
      : null;

    const monthsSinceInicio = Math.floor(
      endosoInicioVigencia?.diff(inicioVigencia, "months", true) || 0
    );

    const pastRecibos = Math.ceil(
      (monthsSinceInicio * formRecibosContext.formaPago) / 12
    );

    let primaNeta = primas.primaNeta;
    let financiamiento = primas.financiamiento;
    let otros = primas.otros;

    for (let i = 0; i < formRecibosContext.nrOfRecibos; i++) {
      const reciboInicio =
        endoso && i === 0
          ? moment(formRecibosContext.endosoInicioVigencia)
          : inicioVigencia
              .clone()
              .add(
                (pastRecibos + i) * (12 / formRecibosContext.formaPago),
                "months"
              );

      let reciboPrimaNeta = primaNeta / formRecibosContext.nrOfRecibos;
      const expedicion = i === 0 ? primas.expedicion : 0;
      let reciboFinanciamiento =
        financiamiento / formRecibosContext.nrOfRecibos;
      let reciboOtros = otros / formRecibosContext.nrOfRecibos;

      if (endoso) {
        if (i === 0) {
          const reciboFin = inicioVigencia
            .clone()
            .add(
              (pastRecibos + 1) * (12 / formRecibosContext.formaPago),
              "months"
            );

          const endosoDaysDiff = moment(
            formRecibosContext.endosoFinVigencia
          ).diff(reciboInicio, "days");
          const reciboDaysDiff = reciboFin.diff(reciboInicio, "days");

          reciboPrimaNeta = (reciboDaysDiff * primaNeta) / endosoDaysDiff;
          reciboFinanciamiento =
            (reciboDaysDiff * financiamiento) / endosoDaysDiff;
          reciboOtros = (reciboDaysDiff * otros) / endosoDaysDiff;

          primaNeta -= reciboPrimaNeta;
          financiamiento -= reciboFinanciamiento;
          otros -= reciboOtros;
        } else {
          reciboPrimaNeta = primaNeta / (formRecibosContext.nrOfRecibos - 1);
          reciboFinanciamiento =
            financiamiento / (formRecibosContext.nrOfRecibos - 1);
          reciboOtros = otros / (formRecibosContext.nrOfRecibos - 1);
        }
      }

      const subtotal = reciboPrimaNeta + reciboFinanciamiento + reciboOtros;

      const iva =
        primas.iva === 0
          ? 0
          : i === 0
          ? (subtotal + expedicion) * 0.16
          : subtotal * 0.16;
      const primaTotal = i === 0 ? subtotal + expedicion + iva : subtotal + iva;

      const recibo: Recibo = {
        exhibicion: i + 1,
        de: formRecibosContext.nrOfRecibos,
        primaNeta: reciboPrimaNeta,
        expedicion,
        financiamiento: reciboFinanciamiento,
        otros: reciboOtros,
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
  }, [formRecibosContext.formaPago, formRecibosContext.monthsDiff]);

  if (endoso) {
    useEffect(() => {
      const recibos = generateRecibos();
      formRecibosContext.setRecibos(recibos);
    }, [
      formRecibosContext.monthsDiff,
      formRecibosContext.subtotalWoExp,
      formRecibosContext.primas,
      formRecibosContext.nrOfRecibos,
      formRecibosContext.endosoInicioVigencia,
      formRecibosContext.endosoFinVigencia,
    ]);
  } else {
    useEffect(() => {
      const recibos = generateRecibos();
      formRecibosContext.setRecibos(recibos);
    }, [
      formRecibosContext.monthsDiff,
      formRecibosContext.formaPago,
      formRecibosContext.subtotalWoExp,
      formRecibosContext.primas,
      formRecibosContext.nrOfRecibos,
      formRecibosContext.polizaInicioVigencia,
      formRecibosContext.polizaFinVigencia,
    ]);
  }

  const updateRecibo = (exhibicion: number, updated: Recibo) => {
    const updatedArray = formRecibosContext.recibos.map((recibo) =>
      recibo.exhibicion === exhibicion ? { ...updated } : recibo
    );

    formRecibosContext.setRecibos(updatedArray);
  };

  return (
    <div>
      <h2 className="border-b text-xl text-gray-600 font-bold">Recibos</h2>
      <RecibosListHeader />
      <div className="h-1/4 w-full bg-neutral-100 overflow-y-auto">
        {formRecibosContext.recibos.map((recibo, index) => (
          <ReciboListItem
            recibo={recibo}
            onReciboChange={updateRecibo}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Recibos;
