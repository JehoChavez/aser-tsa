const ConfigHeader = ({
  selectedView,
  setSelectedView,
}: {
  selectedView: "aseguradoras" | "vendedores" | "ramos" | "agentes";
  setSelectedView: (
    view: "aseguradoras" | "vendedores" | "ramos" | "agentes"
  ) => void;
}) => {
  return (
    <div className="w-full bg-blue-950 flex mt-2 p-2 rounded-t">
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
          selectedView === "vendedores" ? "bg-indigo-950" : "hover:bg-blue-900"
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
    </div>
  );
};

export default ConfigHeader;
