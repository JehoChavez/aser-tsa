import ActionButton from "../utils/ActionButton";
import EndosoVigenciaSection from "./EndosoVigenciaSection";

const EndosoForm = ({
  id,
  type,
  onCancel,
}: {
  id: number;
  type: "A" | "B" | "D";
  onCancel: () => void;
}) => {
  return (
    <div className="flex flex-col">
      <EndosoVigenciaSection />
      <ActionButton color="red" onClick={onCancel}>
        Cancelar
      </ActionButton>
    </div>
  );
};

export default EndosoForm;
