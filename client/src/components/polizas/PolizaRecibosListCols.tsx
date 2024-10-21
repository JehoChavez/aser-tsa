const PolizaRecibosListCols = () => {
  return (
    <div className="hidden md:grid grid-cols-10 w-full text-wrap p-2 text-center">
      <h3>Endoso</h3>
      <h3>Serie</h3>
      <h3 className="col-span-2">Inicio de Vigencia</h3>
      <h3 className="col-span-2">Límite de Pago</h3>
      <h3 className="col-span-2">Fecha de Pago</h3>
      <h3>Monto</h3>
      <h3>Acción</h3>
    </div>
  );
};

export default PolizaRecibosListCols;
