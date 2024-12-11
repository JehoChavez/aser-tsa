const AseguradorasListHeader = () => {
  return (
    <div className="w-full h-auto text-center p-2 bg-blue-950 text-neutral-200 hidden md:grid md:grid-cols-5 rounded-b">
      <p className="hidden md:block">Aseguradora</p>
      <p className="hidden md:block">Plazo Primer Recibo</p>
      <p className="hidden md:block">Plazo Recibos Subsecuentes</p>
      <p className="hidden md:block col-span-2">Comentarios</p>
    </div>
  );
};

export default AseguradorasListHeader;
