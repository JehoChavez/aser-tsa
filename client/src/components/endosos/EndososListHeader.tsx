const EndososListHeader = () => {
  return (
    <div className="w-full rounded py-1 bg-blue-950 bg-opacity-80 text-gray-200 hidden md:grid grid-cols-12">
      <span className="text-center">Endoso</span>
      <span className="text-center">Tipo</span>
      <span className="text-center col-span-2">Fecha de Emisión</span>
      <span className="text-center col-span-2">Inicio de Vigencia</span>
      <span className="text-center">Estado</span>
      <span className="text-center col-span-3">Comentarios</span>
      <span className="text-center col-span-2">Acciones</span>
    </div>
  );
};

export default EndososListHeader;
