const ConfigHeader = ({
  selectedView,
  setSelectedView,
}: {
  selectedView: "aseguradoras" | "vendedores" | "ramos";
  setSelectedView: (view: "aseguradoras" | "vendedores" | "ramos") => void;
}) => {
  return (
    <div className="w-full bg-blue-950 flex my-2 p-2 rounded">
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
