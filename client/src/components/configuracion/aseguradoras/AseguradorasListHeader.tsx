const AseguradorasListHeader = () => {
  return (
    <div className="w-full h-auto p-2 bg-blue-950 text-neutral-200 hidden md:grid md:grid-cols-6 rounded-b">
      <p className="hidden md:block">Aseguradora</p>
      <p className="hidden md:block text-center">Plazo Primer Recibo</p>
      <p className="hidden md:block text-center">Plazo Recibos Subsecuentes</p>
      <p className="hidden md:block col-span-2 text-center">Comentarios</p>
      <p className="hidden md:block">Acciones</p>
    </div>
  );
};

export default AseguradorasListHeader;
