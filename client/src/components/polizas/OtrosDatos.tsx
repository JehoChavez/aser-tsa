import { PolizaInterface } from "../../types/interfaces";

const OtrosDatos = ({
  poliza,
  inicioVigencia,
  finVigencia,
}: {
  poliza: PolizaInterface;
  inicioVigencia: string;
  finVigencia: string;
}) => {
  return (
    <div className="md:hidden row-start-2 col-span-full p-2 rounded bg-neutral-100 text-neutral-600">
      <h3 className="text-sm text-neutral-500 font-bold">Otros datos</h3>
      <p>Aseguradora: {poliza.aseguradora.aseguradora}</p>
      <p>
        Agente: {poliza.agente.clave} - {poliza.agente.nombre}
      </p>
      <p>Vendedor: {poliza.vendedor?.nombre}</p>
      <p>
        Vigencia: {inicioVigencia} al {finVigencia}
      </p>
    </div>
  );
};

export default OtrosDatos;
