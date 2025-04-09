import { Recibo } from "../../types/interfaces";
import PolizaRecibosListCols from "../polizas/PolizaRecibosListCols";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { PolizaRecibosContext } from "../../store/poliza-recibos-context";
import PolizaReciboListItem from "../polizas/PolizaReciboListItem";
import { Navigate } from "react-router-dom";
import Loading from "../utils/Loading";
import ErrorModal from "../utils/ErrorModal";

const PolizaRecibosSection = ({
  recibos: propsRecibos,
  polizaId,
}: {
  recibos: Recibo[];
  polizaId: number;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [recibos, setRecibos] = useState(propsRecibos);

  useEffect(() => {
    setRecibos(propsRecibos);
  }, [propsRecibos]);

  const [isLoading, setIsLoading] = useState(false);

  const [hasError, setHasError] = useState(false);

  const baseUrl = import.meta.env.VITE_API_URL;

  const fetchRecibos = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/polizas/${polizaId}/recibos`,
        { withCredentials: true }
      );
      setRecibos(response.data.content);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
      }
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onPay = async (id: number, date: Date) => {
    setIsLoading(true);
    try {
      await axios.patch(
        `${baseUrl}/recibos/${id}/pagar`,
        {
          fechaPago: date,
        },
        {
          withCredentials: true,
        }
      );
      fetchRecibos();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
        setHasError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onAnular = async (id: number) => {
    setIsLoading(true);
    try {
      await axios.patch(
        `${baseUrl}/recibos/${id}/anular-pago`,
        {},
        { withCredentials: true }
      );
      fetchRecibos();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
        setHasError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="flex flex-col">
      {hasError && (
        <ErrorModal
          onClick={() => {
            setHasError(false);
          }}
        />
      )}
      <h1 className="text-2xl text-gray-100 text-center font-bold bg-blue-950 p-1 w-full rounded">
        Recibos
      </h1>
      <PolizaRecibosListCols />
      <PolizaRecibosContext.Provider
        value={{
          showModal: false,
          onClose: () => {},
          isLoading,
          recibos,
          fetchRecibos,
          onAnular,
          onPay,
        }}
      >
        {isLoading && <Loading />}
        {recibos.map((recibo) => (
          <PolizaReciboListItem recibo={recibo} key={recibo.id} />
        ))}
      </PolizaRecibosContext.Provider>
    </div>
  );
};

export default PolizaRecibosSection;
