const ClientesListHeader = () => {
  return (
    <div className="h-auto p-2 bg-blue-950 bg-opacity-90 text-neutral-200 flex">
      <div className="w-auto px-2">
        <span>Tipo</span>
      </div>
      <div className="w-full h-auto grid grid-cols-12 ">
        <p className="col-span-3 px-2">Nombre</p>
        <p className="col-span-1 px-2">RFC</p>
        <p className="col-span-2 px-2">Correo</p>
        <p className="col-span-1 px-2">Teléfono</p>
        <p className="col-span-1 px-2">Empresa</p>
        <p className="col-start-10 col-span-full px-2">Acción</p>
      </div>
    </div>
  );
};

export default ClientesListHeader;
