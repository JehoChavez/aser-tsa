import { useParams } from "react-router-dom";

const NuevaPoliza = () => {
  const { id: clienteId } = useParams();

  return (
    <div className="w-full h-full px-5 py-4 flex flex-col">
      <h1>Nueva Póliza</h1>
      {clienteId && <p>{clienteId}</p>}
    </div>
  );
};

export default NuevaPoliza;
