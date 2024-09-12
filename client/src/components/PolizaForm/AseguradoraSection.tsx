import { useState } from "react";
import { AseguradoraSectionProps } from "../../types/interfaces";
import FormSection from "../utils/FormSection";
import FormSelectInput from "../utils/FormSelectInput";

const AseguradoraSection = ({
  aseguradoras,
  agentes,
  vendedores,
  ramos,
  aseguradora,
  agente,
  vendedor,
  ramo,
}: AseguradoraSectionProps) => {
  const [selectedAseguradora, setSelectedAseguradora] = useState(
    aseguradora || 1
  );

  const aseguradoraSelectHandler = (selected: string) => {
    setSelectedAseguradora(parseInt(selected));
  };

  const displayAgentes = agentes.filter(
    (agente) => agente.aseguradoraId === selectedAseguradora
  );

  const agenteOptions = displayAgentes.map((agenteOp) => {
    return {
      value: agenteOp.id,
      name: `${agenteOp.clave} - ${agenteOp.nombre}`,
    };
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
          defaultVal={aseguradora}
          onSelect={aseguradoraSelectHandler}
        />
      </div>
      <div className="md:w-1/4 px-2">
        <FormSelectInput
          name="agenteId"
          label="Agente"
          options={agenteOptions}
          defaultVal={agente}
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
          defaultVal={vendedor}
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
          defaultVal={ramo}
        />
      </div>
    </FormSection>
  );
};

export default AseguradoraSection;
