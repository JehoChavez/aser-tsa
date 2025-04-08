import { useState } from "react";
import ActionButton from "../../utils/ActionButton";
import ChangePasswordDialog from "./ChangePasswordDialog";

const AccesoView = () => {
  const [showDialog, setShowDialog] = useState(false);

  const toggleDialog = () => {
    setShowDialog((prev) => !prev);
  };

  return (
    <div className="w-72 mt-2">
      <ActionButton color="blue" onClick={toggleDialog}>
        Cambiar Contraseña
      </ActionButton>
      {showDialog && <ChangePasswordDialog onClose={toggleDialog} />}
    </div>
  );
};

export default AccesoView;
