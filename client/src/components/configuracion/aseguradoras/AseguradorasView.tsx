import { useState, useEffect, useCallback } from "react";
import { AseguradoraInterface } from "../../../types/interfaces";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import Loading from "../../utils/Loading";
import ErrorModal from "../../utils/ErrorModal";
import { AseguradorasContext } from "../../../store/aseguradoras-context";
import AseguradorasList from "./AseguradorasList";

const AseguradorasView = () => {
  const [aseguradoras, setAseguradoras] = useState<AseguradoraInterface[]>([]);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchAseguradoras = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/aseguradoras",
        { withCredentials: true }
      );
      setAseguradoras(response.data.content);
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
    fetchAseguradoras();
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
      <AseguradorasContext.Provider value={{ aseguradoras, fetchAseguradoras }}>
        <AseguradorasList />
      </AseguradorasContext.Provider>
    </>
  );
};

export default AseguradorasView;
