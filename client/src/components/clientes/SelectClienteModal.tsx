import { useState, useCallback, useEffect } from "react";
import Modal from "../utils/Modal";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import { ClienteInterface, ClientesSearchParams } from "../../types/interfaces";
import SearchInput from "../utils/SearchInput";
import Loading from "../utils/Loading";
import ListItem from "../utils/ListItem";

const SelectClienteModal = ({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect?: () => void;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [nombre, setNombre] = useState<string | null>();
  const [clientes, setClientes] = useState<ClienteInterface[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  const fetchClientes = useCallback(async () => {
    const params: ClientesSearchParams = {};
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

  console.log(clientes);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (selected) return <Navigate to={`/clientes/${selected}/nueva`} />;

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
                      onSelect();
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
    </Modal>
  );
};

export default SelectClienteModal;
