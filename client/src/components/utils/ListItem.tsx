import { ListItemProps } from "../../types/interfaces";

const ListItem = ({ children }: ListItemProps) => {
  return (
    <div className="w-full my-1 p-1 border border-slate-400 rounded">{children}</div>
  );
};

export default ListItem;
