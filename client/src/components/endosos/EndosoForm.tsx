import ActionButton from "../utils/ActionButton";

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
      <p>{type}</p>
      <ActionButton color="red" onClick={onCancel}>
        Cancelar
      </ActionButton>
    </div>
  );
};

export default EndosoForm;
