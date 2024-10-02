import { useState } from "react";
import { Navigate } from "react-router-dom";
import DropdownButton from "../../utils/DropdownButton";

const ReexpedirButton = ({
  id,
  disabled,
}: {
  id: number;
  disabled?: boolean;
}) => {
  const [navigate, setNavigate] = useState(false);

  if (navigate) return <Navigate to={`/polizas/${id}/reexpedir`} />;

  return (
    <DropdownButton
      onClick={() => {
        setNavigate(true);
      }}
      disabled={disabled}
    >
      Reexpedir
    </DropdownButton>
  );
};

export default ReexpedirButton;
