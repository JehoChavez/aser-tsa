import { useParams } from "react-router-dom";

const Cliente = () => {
  const { id } = useParams();

  return (
    <div className="mt-16 w-full h-full px-5 py-4 flex flex-col">
      Cliente {id} Page
    </div>
  );
};

export default Cliente;
