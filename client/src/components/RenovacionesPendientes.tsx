import { useContext } from "react";
import { CalendarContext } from "../store/calendar-context";
import Modal from "./Modal";
import ListDialog from "./LIstDialog";
import PendientesRenovLIstHeader from "./PendientesRenovLIstHeader";

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
        header={<PendientesRenovLIstHeader />}
      ></ListDialog>
    </Modal>
  );
};

export default RenovacionesPendientes;
