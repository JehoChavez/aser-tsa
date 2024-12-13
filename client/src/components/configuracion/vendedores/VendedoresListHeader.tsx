const VendedoresListHeader = () => {
  return (
    <div className="w-full h-auto p-2 bg-blue-950 text-neutral-200 hidden md:grid md:grid-cols-3 rounded-b">
      <p className="hidden md:block">Vendedor</p>
      <p className="hidden md:block text-center">Comentarios</p>
      <p className="hidden md:block text-center">Acciones</p>
    </div>
  );
};

export default VendedoresListHeader;
