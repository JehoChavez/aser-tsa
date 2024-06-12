import { ListItemProps } from "../types/interfaces";

const ListItem = ({ children }: ListItemProps) => {
  return <div className="w-full m-1 p-1">{children}</div>;
};

export default ListItem;
