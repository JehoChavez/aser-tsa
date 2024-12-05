const NotFound = ({ type }: { type: "poliza" | "cliente" }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">404 Not Found</h1>
      <p className="text-lg">
        {type === "poliza" ? "La póliza a la" : "El cliente al"} que intentas
        acceder no existe
      </p>
    </div>
  );
};

export default NotFound;
