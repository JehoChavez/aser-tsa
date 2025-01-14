import Dropdown from "../../utils/Dropdown";
import { useContext, useState, useEffect } from "react";
import { PolizasContext } from "../../../store/polizas-context";
import ActionButton from "../../utils/ActionButton";

const OrderDropdown = () => {
  const polizasContext = useContext(PolizasContext);

  const porOptions = [
    ["createdAt", "Creación"],
    ["inicioVigencia", "Inicio de Vigencia"],
    ["finVigencia", "Fin de Vigencia"],
    ["emision", "Emisión"],
    ["fechaCancelacion", "Cancelación"],
  ];

  const [orden, setOrden] = useState<"ASC" | "DESC">("DESC");

  useEffect(() => {
    polizasContext.setParams({ ...polizasContext.params, orden });
  }, [orden]);

  return (
    <div className="flex items-center md:col-start-12">
      <Dropdown title="Orden" text full>
        {porOptions.map((option) => (
          <div className="hover:font-semibold" key={option[0]}>
            <input
              type="radio"
              id={option[0]}
              name="option"
              className="mr-3"
              checked={polizasContext.params.por === option[0]}
              onChange={() => {
                polizasContext.setParams({
                  ...polizasContext.params,
                  por: option[0] as any,
                });
              }}
            />
            <label htmlFor={option[0]}>{option[1]}</label>
          </div>
        ))}
      </Dropdown>
      <ActionButton onClick={() => setOrden(orden === "ASC" ? "DESC" : "ASC")}>
        {orden === "ASC" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-arrow-up-short"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-arrow-down-short"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4"
            />
          </svg>
        )}
      </ActionButton>
    </div>
  );
};

export default OrderDropdown;
