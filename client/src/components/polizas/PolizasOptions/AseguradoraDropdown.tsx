import Dropdown from "../../utils/Dropdown";
import { useContext, useState, useCallback, useEffect } from "react";
import { PolizasContext } from "../../../store/polizas-context";
import { AseguradoraInterface } from "../../../types/interfaces";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import Modal from "../../utils/Modal";
import Loading from "../../utils/Loading";
import ErrorModal from "../../utils/ErrorModal";

const AseguradoraDropdown = () => {
  const polizasContext = useContext(PolizasContext);

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
    <div className="flex items-center ml-3">
      {isLoading && (
        <Modal size="small">
          <Loading />
        </Modal>
      )}
      {isError && (
        <ErrorModal
          onClick={() => {
            setIsError(false);
          }}
        />
      )}
      <Dropdown title="Aseguradora" text right>
        <div className="w-44 text-gray-800">
          <div className="hover:font-semibold">
            <input type="checkbox" id="todas" className="mr-3" checked={true} />
            <label htmlFor="todas">Todas</label>
          </div>
          {aseguradoras.map((aseguradora) => (
            <div className="hover:font-semibold">
              <input
                type="checkbox"
                id={`${aseguradora.id}`}
                className="mr-3"
              />
              <label htmlFor={`${aseguradora.id}`}>
                {aseguradora.aseguradora}
              </label>
            </div>
          ))}
        </div>
      </Dropdown>
    </div>
  );
};

export default AseguradoraDropdown;
