import { Recibo } from "../../../types/interfaces";
import ListItem from "../../utils/ListItem";
import FormNumberInput from "../../utils/FormNumberInput";
import FormDateInput from "../../utils/FormDateInput";

const ReciboListItem = ({ recibo }: { recibo: Recibo }) => {
  return (
    <ListItem>
      <div className="h-auto text-gray-800 bg-blue-800 bg-opacity-5 grid grid-cols-9 text-center text-xl">
        <p>{recibo.exhibicion}</p>
        <span className="px-1">
          <FormNumberInput name="primaNeta" value={recibo.primaNeta} />
        </span>
        <span className="px-1">
          <FormNumberInput name="expedicion" value={recibo.expedicion} />
        </span>
        <span className="px-1">
          <FormNumberInput
            name="financiamiento"
            value={recibo.financiamiento}
          />
        </span>
        <span className="px-1">
          <FormNumberInput name="otros" value={recibo.otros} />
        </span>
        <span className="px-1">
          <FormNumberInput name="iva" value={recibo.iva} />
        </span>
        <span className="px-1">
          <FormNumberInput name="primaTotal" value={recibo.primaTotal} />
        </span>
        <span className="px-1">
          <FormDateInput
            value={new Date(recibo.fechaInicio)}
            onChange={() => {}}
            name="fechaInicio"
          />
        </span>
        <span className="px-1">
          <FormDateInput
            value={new Date(recibo.fechaLimite)}
            onChange={() => {}}
            name="fechaLimite"
          />
        </span>
      </div>
    </ListItem>
  );
};

export default ReciboListItem;
