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
      <div className="flex justify-between p-2">
        <div>
          <p className="text-sm text-neutral-300">Póliza</p>
          <span>{noPoliza}</span>
        </div>
        <div>
          <p className="text-sm text-neutral-300">Contratante</p>
          <span>{contratante}</span>
        </div>
        <div className="flex">
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
    </div>
  );
};

export default PolizaRecibosListHeader;
