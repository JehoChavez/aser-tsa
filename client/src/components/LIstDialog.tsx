import { ListDialogProps } from "../types/interfaces";

const ListDialog = ({ title, children }: ListDialogProps) => {
  return (
    <>
      <h1 className="text-2xl text-gray-100 text-center font-bold bg-blue-950 p-1">
        {title?.toUpperCase() || "Pendientes"}
      </h1>
      <div className="bg-gray-200 h-full">{children}</div>
    </>
  );
};

export default ListDialog;
