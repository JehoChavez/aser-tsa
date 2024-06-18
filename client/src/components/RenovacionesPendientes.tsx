import { useContext } from "react";
import { CalendarContext } from "../store/calendar-context";
import Modal from "./Modal";
import ListDialog from "./LIstDialog";
import PendientesRenovListHeader from "./PendientesRenovListHeader";
import PendientesRenovListItem from "./PendientesRenovListItem";
import { Renovacion } from "../types/interfaces";

const RenovacionesPendientes = () => {
  const calendarContext = useContext(CalendarContext);

  return (
    <Modal
      size="large"
      closeBtn={true}
      onClose={calendarContext.closePendientesModal}
    >
      <ListDialog
        title={calendarContext.type}
        header={<PendientesRenovListHeader />}
      >
        {calendarContext.dayPendientes &&
        calendarContext.dayPendientes.length > 0 ? (
          calendarContext.dayPendientes.map((pendiente) => {
            const renovacion = pendiente as Renovacion;
            return (
              <PendientesRenovListItem
                renovacion={renovacion}
                key={renovacion.id}
              />
            );
          })
        ) : (
          <h3 className="text-lg text-center">
            No hay pendientes para esta fecha
          </h3>
        )}
      </ListDialog>
    </Modal>
  );
};

export default RenovacionesPendientes;
