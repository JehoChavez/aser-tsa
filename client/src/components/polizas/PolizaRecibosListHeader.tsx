const PolizaRecibosListHeader = ({
  noPoliza,
  contratante,
  primaNeta,
  primaTotal,
}: {
  noPoliza: string;
  contratante: string;
  primaNeta: number;
  primaTotal: number;
}) => {
  const currencyFormatter = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  return (
    <div className="w-full bg-blue-950 text-gray-200">
      <div className="md:flex justify-between p-2">
        <div className="my-2 md:my-0">
          <p className="text-sm text-neutral-300">Póliza</p>
          <span>{noPoliza}</span>
        </div>
        <div className="my-2 md:my-0">
          <p className="text-sm text-neutral-300">Contratante</p>
          <span>{contratante}</span>
        </div>
        <div className="flex justify-between my-2 md:my-0">
          <div className="mx-3">
            <p className="text-sm text-neutral-300">Prima Neta</p>
            <span>${currencyFormatter.format(primaNeta)}</span>
          </div>
          <div className="mx-3">
            <p className="text-sm text-neutral-300">Prima Total</p>
            <span>${currencyFormatter.format(primaTotal)}</span>
          </div>
        </div>
      </div>
      <div className="hidden md:grid grid-cols-9 w-full text-wrap p-2 text-center">
        <h3>Endoso</h3>
        <h3>Serie</h3>
        <h3 className="col-span-2">Inicio de Vigencia</h3>
        <h3 className="col-span-2">Límite de Pago</h3>
        <h3 className="col-span-2">Fecha de Pago</h3>
        <h3>Acción</h3>
      </div>
    </div>
  );
};

export default PolizaRecibosListHeader;
