import Dropdown from "../../utils/Dropdown";
import { useContext, useState, useCallback, useEffect } from "react";
import { PolizasContext } from "../../../store/polizas-context";
import { RamoInterface } from "../../../types/interfaces";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import Modal from "../../utils/Modal";
import Loading from "../../utils/Loading";
import ErrorModal from "../../utils/ErrorModal";

const RamoDropdown = () => {
  const polizasContext = useContext(PolizasContext);

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

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    let newRamo = [...(polizasContext.params.ramo || [])];

    if (id === "0") {
      if (checked) {
        newRamo = [];
      }
    } else {
      if (checked) {
        newRamo.push(parseInt(id));
      } else {
        newRamo = newRamo.filter((ramo) => ramo !== parseInt(id));
      }
    }

    polizasContext.setParams({
      ...polizasContext.params,
      ramo: newRamo,
    });
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex items-center">
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
      <Dropdown title="Ramo" text right full>
        <div className="w-44 text-gray-800">
          <div className="hover:font-semibold">
            <input
              type="checkbox"
              id="0"
              checked={polizasContext.params.ramo?.length === 0 || false}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="0" className="pl-3">
              Todas
            </label>
          </div>
        </div>
        {ramos.map((ramo) => (
          <div key={ramo.id} className="hover:font-semibold">
            <input
              type="checkbox"
              id={ramo.id.toString()}
              checked={polizasContext.params.ramo?.includes(ramo.id) || false}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={ramo.id.toString()} className="pl-3">
              {ramo.ramo}
            </label>
          </div>
        ))}
      </Dropdown>
    </div>
  );
};

export default RamoDropdown;
