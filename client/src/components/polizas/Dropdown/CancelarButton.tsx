import { useState } from "react";
import DropdownButton from "../../utils/DropdownButton";
import Modal from "../../utils/Modal";
import ActionButton from "../../utils/ActionButton";
import FormDateInput from "../../utils/FormDateInput";
import axios from "axios";
import ErrorModal from "../../utils/ErrorModal";
import SuccessModal from "../../utils/SuccessModal";

const CancelarButton = ({ id }: { id: number }) => {
  const [showModal, setShowModal] = useState(false);

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [date, setDate] = useState(new Date());

  const cancelHandler = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/polizas/${id}/cancelar`,
        { fechaCancelacion: date },
        { withCredentials: true }
      );

      if (response.data.status === 200) {
        setShowModal(false);
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
      setShowModal(false);
      setError(true);
    }
  };

  return (
    <>
      <DropdownButton
        onClick={() => {
          setShowModal(true);
        }}
      >
        Cancelar
      </DropdownButton>
      {showModal && (
        <Modal size="small">
          <div className="w-full h-full flex flex-col justify-between">
            <h2 className="text-3xl text-center">Cancelar Póliza</h2>
            <div>
              <FormDateInput
                name="fechaCancelacion"
                label="Fecha de Cancelación"
                value={date}
                onChange={(date) => {
                  const newDate = new Date(date.setDate(date.getDate() + 1));
                  setDate(newDate);
                }}
              />
            </div>
            <div className="w-full flex justify-between mb-3">
              <ActionButton
                onClick={() => {
                  setShowModal(false);
                }}
                color="red"
              >
                Cancelar
              </ActionButton>
              <ActionButton color="blue" onClick={cancelHandler}>
                Continuar
              </ActionButton>
            </div>
          </div>
        </Modal>
      )}
      {error && (
        <ErrorModal
          onClick={() => {
            setError(false);
          }}
        />
      )}
      {success && (
        <SuccessModal
          type="cancelada"
          onOk={() => {
            setSuccess(false);
          }}
        />
      )}
    </>
  );
};

export default CancelarButton;
