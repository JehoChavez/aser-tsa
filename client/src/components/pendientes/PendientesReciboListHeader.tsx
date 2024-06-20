const PendientesReciboListHeader = () => {
  return (
    <div className="hidden w-full p-2 bg-blue-950 text-gray-200 lg:grid grid-cols-12 text-wrap">
      <h3 className="col-start-1 col-span-3 2xl:col-span-2">Cliente</h3>
      <h3 className="hidden 2xl:block 2xl:col-span-2">Ramo</h3>
      <h3 className="col-span-2">Póliza</h3>
      <h3>Endoso</h3>
      <h3>Serie</h3>
      <h3 className="hidden 2xl:block col-span-1">Aseguradora</h3>
      <h3 className="col-span-3 xl:col-span-2">Monto</h3>
      <h3>Acción</h3>
    </div>
  );
};

export default PendientesReciboListHeader;
