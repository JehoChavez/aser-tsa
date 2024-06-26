const PolizasListHeader  = () => {
  return (
    <div className="w-full h-auto p-2 bg-blue-950 bg-opacity-90 text-neutral-200 grid grid-cols-4 md:grid-cols-12">
      <p className="col-span-1 md:col-span-2 lg:col-span-1 px-2">No. Póliza</p>
      <p className="hidden md:block md:col-span-2 xl:col-span-1 px-2">Aseguradora</p>
      <p className="hidden lg:block col-span-2 px-2">Agente</p>
      <p className="hidden xl:block px-2">Vendedor</p>
      <p className="col-span-2 md:col-span-3 px-2">Contratante</p>
      <p className="hidden md:block px-2">Inicio Vigencia</p>
      <p className="hidden md:block px-2">Fin Vigencia</p>
      <p className="px-2 col-auto">Acción</p>
    </div>
  )
}

export default PolizasListHeader;