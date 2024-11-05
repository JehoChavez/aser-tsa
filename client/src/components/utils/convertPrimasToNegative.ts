import { PrimasInterface } from "../../types/interfaces";

const convertPrimasToNegative = (primas: PrimasInterface) => {
  return {
    primaNeta: -Math.abs(primas.primaNeta),
    expedicion: -Math.abs(primas.expedicion),
    financiamiento: -Math.abs(primas.financiamiento),
    otros: -Math.abs(primas.otros),
    iva: -Math.abs(primas.iva),
    primaTotal: -Math.abs(primas.primaTotal),
  };
};

export default convertPrimasToNegative;
