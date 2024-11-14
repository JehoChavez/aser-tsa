import { useNavigate } from "react-router-dom";
import ActionButton from "./ActionButton";

const ReturnButton = ({ size }: { size?: "md" | "lg" }) => {
  const navigate = useNavigate();

  return (
    <ActionButton
      size={size}
      color="blue"
      onClick={() => {
        navigate(-1);
      }}
    >
      Regresar
    </ActionButton>
  );
};

export default ReturnButton;
