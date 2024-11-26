import FormSection from "../../utils/FormSection";
import FormTextInput from "../../utils/FormTextInput";
import FormSelectInput from "../../utils/FormSelectInput";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { Estado, Municipio } from "../../../types/interfaces";
import { Navigate } from "react-router-dom";

const DomicilioSection = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [error, setError] = useState(false);

  const [isEstadosLoading, setIsEstadosLoading] = useState(false);
  const [isMunicipiosLoading, setIsMunicipiosLoading] = useState(false);

  const [estados, setEstados] = useState<Estado[]>([]);
  const [estadoId, setEstadoId] = useState<number>(0);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);

  const fetchEstados = async () => {
    try {
      setIsEstadosLoading(true);
      const response = await axios.get("http://localhost:3000/api/estados", {
        withCredentials: true,
      });
      setEstados([{ id: 0, estado: "Seleccione" }, ...response.data.content]);
    } catch (error) {
      setError(true);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
      }
    } finally {
      setIsEstadosLoading(false);
    }
  };

  const fetchMunicipios = async () => {
    if (estadoId === 0) {
      setMunicipios([]);
    } else {
      try {
        setIsMunicipiosLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/estados/${estadoId}/municipios`,
          {
            withCredentials: true,
          }
        );
        setMunicipios([
          { id: 0, municipio: "Seleccione" },
          ...response.data.content,
        ]);
      } catch (error) {
        setError(true);
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            setIsAuthenticated(false);
          }
        }
      } finally {
        setIsMunicipiosLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchEstados();
  }, []);

  useEffect(() => {
    fetchMunicipios();
  }, [estadoId]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <>
      <h2 className="border-b text-xl text-gray-600 font-bold w-full">
        Domicilio
      </h2>
      <FormSection>
        <div className="w-full md:w-2/6 md:pr-1 flex flex-col justify-end">
          <FormTextInput name="calle" label="Calle" />
        </div>
        <div className="w-full md:w-1/6 md:px-1 flex flex-col justify-end">
          <FormTextInput name="exterior" label="Exterior" />
        </div>
        <div className="w-full md:w-1/6 md:px-1 flex flex-col justify-end">
          <FormTextInput name="interior" label="Interior" />
        </div>
        <div className="w-full md:w-2/6 md:px-1 flex flex-col justify-end">
          <FormTextInput name="colonia" label="Colonia" />
        </div>
      </FormSection>
      <FormSection>
        <div className="w-full md:w-1/6 md:pr-1 flex flex-col justify-end">
          <FormTextInput name="codigoPostal" label="Código Postal" />
        </div>
        <div className="w-full md:w-2/6 md:px-1 flex flex-col justify-end">
          <FormSelectInput
            name="estado"
            label="Estado"
            options={
              isEstadosLoading
                ? [{ value: 0, name: "Cargando..." }]
                : estados.map((estado) => ({
                    value: estado.id,
                    name: estado.estado,
                  }))
            }
            onSelect={(id) => {
              setEstadoId(parseInt(id));
            }}
          />
        </div>
        <div className="w-full md:w-2/6 md:px-1 flex flex-col justify-end">
          <FormSelectInput
            name="municipio"
            label="Municipio"
            options={
              isMunicipiosLoading
                ? [{ value: 0, name: "Cargando..." }]
                : municipios.map((municipio) => ({
                    value: municipio.id,
                    name: municipio.municipio,
                  }))
            }
            disabled={estadoId === 0}
          />
        </div>
      </FormSection>
    </>
  );
};

export default DomicilioSection;
