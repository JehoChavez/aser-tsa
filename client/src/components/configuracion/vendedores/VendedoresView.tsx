import { useState, useEffect, useCallback } from "react";
import { VendedorInterface } from "../../../types/interfaces";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import Loading from "../../utils/Loading";
import ErrorModal from "../../utils/ErrorModal";
import { VendedoresContext } from "../../../store/vendedores-context";
import VendedoresList from "./VendedoresList";

const VendedoresView = () => {
  const [vendedores, setVendedores] = useState<VendedorInterface[]>([]);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchVendedores = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/vendedores", {
        withCredentials: true,
      });
      setVendedores(response.data.content);
    } catch (error) {
      setIsError(true);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVendedores();
  }, []);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <>
      {isLoading && <Loading />}
      {isError && (
        <ErrorModal
          onClick={() => {
            setIsError(false);
          }}
        />
      )}
      <VendedoresContext.Provider value={{ vendedores, fetchVendedores }}>
        <VendedoresList />
      </VendedoresContext.Provider>
    </>
  );
};

export default VendedoresView;
