const ConfigHeader = ({
  selectedView,
  setSelectedView,
}: {
  selectedView: "aseguradoras" | "vendedores" | "ramos" | "agentes" | "acceso";
  setSelectedView: (
    view: "aseguradoras" | "vendedores" | "ramos" | "agentes" | "acceso"
  ) => void;
}) => {
  return (
    <div className="w-full bg-blue-950 p-2 rounded-t md:flex justify-between">
      <div className="w-full flex mt-2 overflow-y-auto">
        <p
          className={`rounded-md ${
            selectedView === "aseguradoras"
              ? "bg-indigo-950"
              : "hover:bg-blue-900"
          } px-3 mx-2 py-2 text-sm font-medium text-white hover:cursor-pointer`}
          onClick={() => {
            setSelectedView("aseguradoras");
          }}
        >
          Aseguradoras
        </p>
        <p
          className={`rounded-md ${
            selectedView === "agentes" ? "bg-indigo-950" : "hover:bg-blue-900"
          } px-3 mx-2 py-2 text-sm font-medium text-white hover:cursor-pointer`}
          onClick={() => {
            setSelectedView("agentes");
          }}
        >
          Agentes
        </p>
        <p
          className={`rounded-md ${
            selectedView === "vendedores"
              ? "bg-indigo-950"
              : "hover:bg-blue-900"
          } px-3 mx-2 py-2 text-sm font-medium text-white hover:cursor-pointer`}
          onClick={() => {
            setSelectedView("vendedores");
          }}
        >
          Vendedores
        </p>
        <p
          className={`rounded-md ${
            selectedView === "ramos" ? "bg-indigo-950" : "hover:bg-blue-900"
          } px-3 mx-2 py-2 text-sm font-medium text-white hover:cursor-pointer`}
          onClick={() => {
            setSelectedView("ramos");
          }}
        >
          Ramos
        </p>
        <p
          className={`rounded-md ${
            selectedView === "acceso" ? "bg-indigo-950" : "hover:bg-blue-900"
          } px-3 mx-2 py-2 text-sm font-medium text-white hover:cursor-pointer`}
          onClick={() => {
            setSelectedView("acceso");
          }}
        >
          Acceso
        </p>
      </div>
      <div className="w-full md:w-40 flex justify-end pt-2 md:pt-0">
        <div id="button-portal-root" className="w-40 h-10 md:h-full"></div>
      </div>
    </div>
  );
};

export default ConfigHeader;
