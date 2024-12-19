import { useState, useEffect, useCallback } from "react";
import { RamoInterface } from "../../../types/interfaces";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import Loading from "../../utils/Loading";
import ErrorModal from "../../utils/ErrorModal";
import { RamosContext } from "../../../store/ramos-context";

const RamosView = () => {
  const [ramos, setRamos] = useState<RamoInterface[]>([]);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchRamos = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/ramos", {
        withCredentials: true,
      });
      setRamos(response.data.content);
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
    fetchRamos();
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
      <RamosContext.Provider value={{ ramos, fetchRamos }}>
        {ramos.map((ramo) => (
          <p>{ramo.ramo}</p>
        ))}
      </RamosContext.Provider>
    </>
  );
};

export default RamosView;
