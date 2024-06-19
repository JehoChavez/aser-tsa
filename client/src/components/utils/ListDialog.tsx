import { ListDialogProps } from "../../types/interfaces";

const ListDialog = ({ title, header, children }: ListDialogProps) => {
  return (
    <>
      <h1 className="text-2xl text-gray-100 text-center font-bold bg-blue-950 p-1">
        {title?.toUpperCase() || "Pendientes"}
      </h1>
      {header}
      <div className="bg-gray-200 h-5/6 flex flex-col mt-2 overflow-y-scroll">
        {children}
      </div>
    </>
  );
};

export default ListDialog;
