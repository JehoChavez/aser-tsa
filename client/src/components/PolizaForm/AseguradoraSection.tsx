import { useState } from "react";
import { AseguradoraSectionProps } from "../../types/interfaces";
import FormSection from "../utils/FormSection";
import FormSelectInput from "../utils/FormSelectInput";

const AseguradoraSection = ({
  aseguradoras,
  agentes,
  vendedores,
  ramos,
}: AseguradoraSectionProps) => {
  const [selectedAseguradora, setSelectedAseguradora] = useState(1);

  const aseguradoraSelectHandler = (selected: string) => {
    setSelectedAseguradora(parseInt(selected));
  };

  const displayAgentes = agentes.filter(
    (agente) => agente.aseguradoraId === selectedAseguradora
  );

  const agenteOptions = displayAgentes.map((agente) => {
    return { value: agente.id, name: `${agente.clave} - ${agente.nombre}` };
  });

  return (
    <FormSection>
      <div className="md:w-1/4 px-2">
        <FormSelectInput
          name="aseguradoraId"
          label="Aseguradora"
          options={aseguradoras.map((aseguradora) => {
            return {
              value: aseguradora.id,
              name: aseguradora.aseguradora,
            };
          })}
          onSelect={aseguradoraSelectHandler}
        />
      </div>
      <div className="md:w-1/4 px-2">
        <FormSelectInput
          name="agenteId"
          label="Agente"
          options={agenteOptions}
        />
      </div>
      <div className="md:w-1/4 px-2">
        <FormSelectInput
          name="vendedorId"
          label="Vendedor"
          options={vendedores.map((vendedor) => {
            return {
              value: vendedor.id,
              name: vendedor.nombre,
            };
          })}
        />
      </div>
      <div className="md:w-1/4 px-2">
        <FormSelectInput
          name="ramoId"
          label="Ramo"
          options={ramos.map((ramo) => {
            return {
              value: ramo.id,
              name: ramo.ramo,
            };
          })}
        />
      </div>
    </FormSection>
  );
};

export default AseguradoraSection;
