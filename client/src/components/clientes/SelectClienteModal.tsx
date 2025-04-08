import { useState, useCallback, useEffect } from "react";
import Modal from "../utils/Modal";
import axios, { AxiosError } from "axios";
import { Navigate, Link } from "react-router-dom";
import { ClienteInterface } from "../../types/interfaces";
import SearchInput from "../utils/SearchInput";
import Loading from "../utils/Loading";
import ListItem from "../utils/ListItem";
import IconTextButton from "../utils/IconTextButton";

const SelectClienteModal = ({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect?: (selected: number) => void;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [nombre, setNombre] = useState<string | null>();
  const [clientes, setClientes] = useState<ClienteInterface[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  const fetchClientes = useCallback(async () => {
    const params: { nombre?: string } = {};
    if (nombre) {
      params.nombre = nombre;
    }
    try {
      const response = await axios.get("http://localhost:3000/api/clientes", {
        params,
        withCredentials: true,
      });
      setIsLoading(false);
      setClientes(response.data.content);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
      }
    }
  }, [nombre]);

  useEffect(() => {
    fetchClientes();
  }, [fetchClientes]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (selected && !onSelect)
    return <Navigate to={`/clientes/${selected}/nueva`} />;

  return (
    <Modal size="medium" closeBtn={true} onClose={onClose}>
      <h4 className="text-xl text-blue-950 font-bold mb-3">
        Selecciona el Cliente
      </h4>
      <SearchInput
        placeholder="Buscar Cliente"
        onSearch={(value) => {
          setNombre(value);
        }}
      />
      <div className="mt-2 p-2 bg-gray-300 bg-opacity-60 rounded h-full overflow-auto">
        {isLoading ? (
          <Loading />
        ) : (
          clientes.map((cliente) => {
            return (
              <ListItem key={cliente.id}>
                <div
                  className="w-full h-full p-1 rounded bg-blue-200 bg-opacity-25 hover:bg-blue-900 hover:bg-opacity-25 hover:cursor-pointer"
                  onClick={() => {
                    setSelected(cliente.id);
                    if (onSelect) {
                      onSelect(cliente.id);
                    }
                  }}
                >
                  {cliente.nombre}
                </div>
              </ListItem>
            );
          })
        )}
      </div>
      <div className="flex justify-end pt-1">
        <Link to="/clientes/nuevo">
          <IconTextButton
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-person-fill-add mr-2"
                viewBox="0 0 16 16"
              >
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
              </svg>
            }
            height="h-8"
          >
            Nuevo
          </IconTextButton>
        </Link>
      </div>
    </Modal>
  );
};

export default SelectClienteModal;
