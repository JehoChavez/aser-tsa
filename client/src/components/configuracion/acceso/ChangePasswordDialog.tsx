import { useState } from "react";
import Modal from "../../utils/Modal";
import axios from "axios";
import FormPasswordInput from "../../utils/FormPasswordInput";

const ChangePasswordDialog = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal size="small" onClose={onClose} closeBtn>
      <h3 className="text-2xl bg-blue-950 text-neutral-50 rounded p-2">
        Cambiar Contraseña
      </h3>
      <div className="w-full flex flex-col items-center gap-4 mt-2">
        <FormPasswordInput
          name="currentPassword"
          label="Contraseña Actual"
          autoComplete="new-password"
        />
        <FormPasswordInput
          name="newPassword"
          label="Nueva Contraseña"
          autoComplete="new-password"
        />
      </div>
    </Modal>
  );
};

export default ChangePasswordDialog;
