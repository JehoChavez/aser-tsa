import FormSection from "../../utils/FormSection";
import FormTextInput from "../../utils/FormTextInput";
import FormSelectInput from "../../utils/FormSelectInput";
import FormNumberInput from "../../utils/FormNumberInput";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { Estado, Municipio } from "../../../types/interfaces";
import { Navigate } from "react-router-dom";
import ErrorModal from "../../utils/ErrorModal";
import { DomicilioSectionProps } from "../../../types/interfaces";

const DomicilioSection = ({
  calle,
  exterior,
  interior,
  colonia,
  codigoPostal,
  estado,
  municipio,
}: DomicilioSectionProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [error, setError] = useState(false);

  const [isEstadosLoading, setIsEstadosLoading] = useState(false);
  const [isMunicipiosLoading, setIsMunicipiosLoading] = useState(false);

  const [estados, setEstados] = useState<Estado[]>([]);
  const [estadoId, setEstadoId] = useState<number>(estado || 0);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);

  const baseUrl = import.meta.env.VITE_API_URL;

  const fetchEstados = async () => {
    try {
      setIsEstadosLoading(true);
      const response = await axios.get(`${baseUrl}/estados`, {
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
          `${baseUrl}/estados/${estadoId}/municipios`,
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
      {error && <ErrorModal />}
      <h2 className="border-b text-xl text-gray-600 font-bold w-full">
        Domicilio
      </h2>
      <FormSection>
        <div className="w-full md:w-2/6 md:pr-1 flex flex-col justify-end">
          <FormTextInput name="calle" label="Calle" defaultValue={calle} />
        </div>
        <div className="w-full md:w-1/6 md:px-1 flex flex-col justify-end">
          <FormTextInput
            name="exterior"
            label="Exterior"
            defaultValue={exterior}
          />
        </div>
        <div className="w-full md:w-1/6 md:px-1 flex flex-col justify-end">
          <FormTextInput
            name="interior"
            label="Interior"
            defaultValue={interior}
          />
        </div>
        <div className="w-full md:w-2/6 md:px-1 flex flex-col justify-end">
          <FormTextInput
            name="colonia"
            label="Colonia"
            defaultValue={colonia}
          />
        </div>
      </FormSection>
      <FormSection>
        <div className="w-full md:w-1/6 md:pr-1 flex flex-col justify-end">
          <FormNumberInput
            name="codigoPostal"
            label="Código Postal"
            defaultVal={parseInt(codigoPostal || "") || undefined}
          />
        </div>
        <div className="w-full md:w-2/6 md:px-1 flex flex-col justify-end">
          <FormSelectInput
            name="estadoId"
            label="Estado"
            options={
              isEstadosLoading
                ? [{ value: 0, name: "Cargando..." }]
                : estados.map((estado) => ({
                    value: estado.id,
                    name: estado.estado,
                  }))
            }
            defaultVal={estado}
            onSelect={(id) => {
              setEstadoId(parseInt(id));
            }}
          />
        </div>
        <div className="w-full md:w-2/6 md:px-1 flex flex-col justify-end">
          <FormSelectInput
            name="municipioId"
            label="Municipio"
            options={
              isMunicipiosLoading
                ? [{ value: 0, name: "Cargando..." }]
                : municipios.map((municipio) => ({
                    value: municipio.id,
                    name: municipio.municipio,
                  }))
            }
            defaultVal={municipio}
            disabled={estadoId === 0}
          />
        </div>
      </FormSection>
    </>
  );
};

export default DomicilioSection;
