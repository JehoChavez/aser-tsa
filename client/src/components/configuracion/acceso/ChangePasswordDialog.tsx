import { useState } from "react";
import Modal from "../../utils/Modal";
import axios from "axios";
import FormPasswordInput from "../../utils/FormPasswordInput";
import ActionButton from "../../utils/ActionButton";
import Loading from "../../utils/Loading";
import SuccessModal from "../../utils/SuccessModal";
import ErrorModal from "../../utils/ErrorModal";

const ChangePasswordDialog = ({ onClose }: { onClose: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;

    try {
      setIsLoading(true);
      const baseAuthUrl = import.meta.env.VITE_AUTH_URL;
      const response = await axios.post(`${baseAuthUrl}/change-password`, {
        currentPassword,
        newPassword,
      });
      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          setIncorrectPassword(true);
        } else {
          setIsError(true);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal size="small" onClose={onClose} closeBtn>
      {success && <SuccessModal type="contraseña" onOk={onClose} />}
      {isError && <ErrorModal onClick={onClose} />}
      <h3 className="text-2xl bg-blue-950 text-neutral-50 rounded p-2">
        Cambiar Contraseña
      </h3>
      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="w-full flex flex-col items-center gap-4 mt-2">
            <FormPasswordInput
              name="currentPassword"
              label="Contraseña Actual"
              autoComplete="new-password"
              errorMessage={
                incorrectPassword ? "Contraseña incorrecta" : undefined
              }
            />
            <FormPasswordInput
              name="newPassword"
              label="Nueva Contraseña"
              autoComplete="new-password"
            />
          </div>
          <div className="flex justify-end mt-5">
            <ActionButton color="blue">Cambiar</ActionButton>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default ChangePasswordDialog;
