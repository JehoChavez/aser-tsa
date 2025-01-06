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

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    let newAseguradora = [...(polizasContext.params.aseguradora || [])];

    if (id === "0") {
      if (checked) {
        newAseguradora = [];
      }
    } else {
      if (checked) {
        newAseguradora.push(parseInt(id));
      } else {
        newAseguradora = newAseguradora.filter(
          (aseguradora) => aseguradora !== parseInt(id)
        );
      }
    }

    polizasContext.setParams({
      ...polizasContext.params,
      aseguradora: newAseguradora,
    });
  };

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
            <input
              type="checkbox"
              id="0"
              checked={polizasContext.params.aseguradora?.length === 0}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="0" className="pl-3">
              Todas
            </label>
          </div>
          {aseguradoras.map((aseguradora) => (
            <div className="hover:font-semibold" key={aseguradora.id}>
              <input
                type="checkbox"
                id={`${aseguradora.id}`}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={`${aseguradora.id}`} className="pl-3">
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
