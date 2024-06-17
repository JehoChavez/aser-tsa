import { useContext } from "react";
import { CalendarContext } from "../store/calendar-context";
import ListItem from "./ListItem";
import ListDialog from "./LIstDialog";
import Modal from "./Modal";
import PendientesReciboListHeader from "./PendientesReciboListHeader";
import PendientesReciboListItem from "./PendientesReciboListItem";
import { Recibo, Renovacion } from "../types/interfaces";

const Pendientes = () => {
  const calendarContext = useContext(CalendarContext);

  if (calendarContext.type === "cobranza" && calendarContext.dayPendientes) {
    return (
      <Modal
        size="large"
        closeBtn={true}
        onClose={calendarContext.closePendientesModal}
      >
        <ListDialog
          title={calendarContext.type}
          header={
            calendarContext.type === "cobranza" ? (
              <PendientesReciboListHeader />
            ) : null
          }
        >
          {!calendarContext.dayPendientes[0] && (
            <h3 className="text-lg text-center">
              No hay pendientes para esta fecha
            </h3>
          )}
          {calendarContext.dayPendientes.map((pendiente) => {
            if (calendarContext.type === "cobranza") {
              const recibo = pendiente as Recibo;
              return (
                <PendientesReciboListItem recibo={recibo} key={recibo.id} />
              );
            } else if (calendarContext.type === "renovacion") {
              const renovacion = pendiente as Renovacion;
              return (
                <ListItem key={renovacion.id}>{renovacion.noPoliza}</ListItem>
              );
            }
            return null;
          })}
        </ListDialog>
      </Modal>
    );
  }

  return <div>No pending items.</div>;
};

export default Pendientes;
