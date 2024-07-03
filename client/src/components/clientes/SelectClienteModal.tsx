import { useState, useCallback, useEffect } from "react";
import Modal from "../utils/Modal";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import { ClienteInterface, ClientesSearchParams } from "../../types/interfaces";
import SearchInput from "../utils/SearchInput";

const SelectClienteModal = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [nombre, setNombre] = useState<string | null>();
  const [clientes, setClientes] = useState<ClienteInterface[]>([]);

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

  return (
    <Modal size="medium">
      <h4 className="text-xl text-blue-950 font-bold mb-3">Selecciona el Cliente</h4>
      <SearchInput
        placeholder="Buscar Cliente"
        onSearch={(value) => {
          setNombre(value);
        }}
      />
    </Modal>
  );
};

export default SelectClienteModal;
