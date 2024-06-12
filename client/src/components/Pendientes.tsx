import { useContext } from "react";
import { CalendarContext } from "../store/calendar-context";
import ListItem from "./ListItem";
import ListDialog from "./LIstDialog";
import Modal from "./Modal";

const Pendientes = () => {
  const calendarContext = useContext(CalendarContext);

  if (calendarContext.type === "cobranza" && calendarContext.dayPendientes) {
    return (
      <Modal
        size="large"
        closeBtn={true}
        onClose={calendarContext.closePendientesModal}
      >
        <ListDialog title={calendarContext.type}>
          {calendarContext.dayPendientes.map((pendiente) => (
            <ListItem key={pendiente.poliza.noPoliza}>
              {pendiente.poliza.noPoliza}
            </ListItem>
          ))}
        </ListDialog>
      </Modal>
    );
  }

  return <div>No pending items.</div>;
};

export default Pendientes;
