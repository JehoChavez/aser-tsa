import { useState, useContext } from "react";
import { EndosoInterface } from "../../types/interfaces";
import ActionButton from "../utils/ActionButton";
import ListItem from "../utils/ListItem";
import ConfirmModal from "../utils/ConfirmModal";
import { EndososContext } from "../../store/endosos-context";

const EndosoListItem = ({ endoso }: { endoso: EndosoInterface }) => {
  const endososContext = useContext(EndososContext);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  return (
    <>
      <ListItem>
        <div className="w-full px-1 bg-neutral-100 flex flex-col md:grid grid-cols-12 md:text-center">
          <div className="flex">
            <p className="md:hidden mr-1 text-neutral-600 font-semibold">
              Endoso
            </p>
            <p
              className="md:w-full underline hover:cursor-pointer"
              onClick={() => {
                endososContext.setEndosoToShow(endoso);
              }}
            >
              {endoso.endoso}
            </p>
          </div>
          <div className="flex">
            <p className="md:hidden mr-1 text-neutral-600 font-semibold">
              Tipo
            </p>
            <p className="md:w-full">{endoso.tipo}</p>
          </div>
          <div className="flex md:col-span-2">
            <p className="md:hidden mr-1 text-neutral-600 font-semibold">
              Emisión
            </p>
            <p className="md:w-full">
              {endoso.emision?.split("-").reverse().join("-")}
            </p>
          </div>
          <div className="flex md:col-span-2">
            <p className="md:hidden mr-1 text-neutral-600 font-semibold">
              Inicio de Vigencia
            </p>
            <p className="md:w-full">
              {endoso.inicioVigencia.split("-").reverse().join("-")}
            </p>
          </div>
          <div className="flex">
            <p className="md:hidden mr-1 text-neutral-600 font-semibold">
              Estado
            </p>
            <p
              className={`md:w-full rounded text-neutral-100 ${
                endoso.fechaCancelacion ? "bg-red-700" : "bg-emerald-700"
              }`}
            >
              {endoso.fechaCancelacion ? "Cancelado" : "Vigente"}
            </p>
          </div>
          <div className="flex md:col-span-3">
            <p className="md:hidden mr-1 text-neutral-600 font-semibold">
              Comentarios
            </p>
            <p className="md:w-full">{endoso.concepto}</p>
          </div>
          <div className="flex justify-center md:col-span-2">
            <ActionButton
              title="Editar Endoso"
              onClick={() => {
                setShowConfirmModal(true);
              }}
              disabled={endoso.fechaCancelacion ? true : false}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fillRule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
              </svg>
            </ActionButton>
          </div>
        </div>
      </ListItem>
      {showConfirmModal && (
        <ConfirmModal
          onCancel={() => {
            setShowConfirmModal(false);
          }}
          onContinue={() => {
            endososContext.setEndosoToEdit(endoso);
            endososContext.setShowForm(true);
          }}
        >
          <h4 className="text-center text-3xl my-3 font-semibold">
            ¿Desea editar el endoso?
          </h4>
          <p className="text-center text-lg my-3">
            Los recibos pagados serán anulados
          </p>
        </ConfirmModal>
      )}
    </>
  );
};

export default EndosoListItem;
