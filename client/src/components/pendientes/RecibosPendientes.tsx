import { useContext } from "react";
import { CalendarContext } from "../../store/calendar-context";
import Modal from "../utils/Modal";
import PendientesReciboListHeader from "./PendientesReciboListHeader";
import ListDialog from "../utils/ListDialog";
import PendientesReciboListItem from "./PendientesReciboListItem";
import { Recibo } from "../../types/interfaces";

const RecibosPendientes = () => {
  const calendarContext = useContext(CalendarContext);
  return (
    <Modal
      size="large"
      closeBtn={true}
      onClose={calendarContext.closePendientesModal}
    >
      <ListDialog
        title={calendarContext.type}
        header={<PendientesReciboListHeader />}
      >
        {calendarContext.dayPendientes &&
        calendarContext.dayPendientes.length > 0 ? (
          calendarContext.dayPendientes.map((pendiente) => {
            const recibo = pendiente as Recibo;
            return <PendientesReciboListItem recibo={recibo} key={recibo.id} />;
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

export default RecibosPendientes;
