import { ReactNode, useState } from "react";
import ActionButton from "./ActionButton";

const Dropdown = ({
  title,
  text,
  children,
  right,
  full,
}: {
  title?: string;
  text?: boolean;
  children: ReactNode;
  right?: boolean;
  full?: boolean;
}) => {
  const [displayMore, setDisplayMore] = useState(false);

  return (
    <div className={`w-full ${full ? "" : "lg:w-auto"} flex relative`}>
      <ActionButton
        title="Más Opciones"
        onClick={() => setDisplayMore((prev) => !prev)}
        full
      >
        {text && title && <h4 className="mr-1">{title}</h4>}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-chevron-down"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
          />
        </svg>
      </ActionButton>
      {displayMore && (
        <div
          className={`absolute top-7 ${
            right ? "left-0" : "right-0"
          } z-30 bg-white rounded min-w-48 max-w-56 max-h-80 shadow-lg shadow-gray-500`}
        >
          {title && (
            <h4 className="text-blue-900 font-bold mt-1 ml-1">{title}</h4>
          )}
          <div className="max-w-56 max-h-64 overflow-auto p-2">{children}</div>
          <button
            className="w-full hover:bg-red-200 rounded active:bg-red-700 active:text-white text-right text-red-700 px-1"
            onClick={() => {
              setDisplayMore(false);
            }}
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
