import Dropdown from "../../utils/Dropdown";
import { useContext, useState, useCallback, useEffect } from "react";
import { PolizasContext } from "../../../store/polizas-context";
import { VendedorInterface } from "../../../types/interfaces";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import Modal from "../../utils/Modal";
import Loading from "../../utils/Loading";
import ErrorModal from "../../utils/ErrorModal";

const VendedorDropdown = () => {
  const polizasContext = useContext(PolizasContext);

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

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    let newVendedor = [...(polizasContext.params.vendedor || [])];

    if (id === "0") {
      if (checked) {
        newVendedor = [];
      }
    } else {
      if (checked) {
        newVendedor.push(parseInt(id));
      } else {
        newVendedor = newVendedor.filter((agente) => agente !== parseInt(id));
      }
    }

    polizasContext.setParams({
      ...polizasContext.params,
      vendedor: newVendedor,
    });
  };

  if (!isAuthenticated) return <Navigate to="/login" replace />;

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
      <Dropdown title="Vendedor" text right full>
        <div className="w-44 text-gray-800">
          <div className="hover:font-semibold">
            <input
              type="checkbox"
              id="0"
              checked={polizasContext.params.vendedor?.length === 0 || false}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="0" className="pl-3">
              Todas
            </label>
          </div>
          {vendedores.map((vendedor) => (
            <div key={vendedor.id} className="hover:font-semibold">
              <input
                type="checkbox"
                id={vendedor.id.toString()}
                checked={
                  polizasContext.params.vendedor?.includes(vendedor.id) || false
                }
                onChange={handleCheckboxChange}
              />
              <label htmlFor={vendedor.id.toString()} className="pl-3">
                {vendedor.nombre}
              </label>
            </div>
          ))}
        </div>
      </Dropdown>
    </div>
  );
};

export default VendedorDropdown;
