import { IconTitleParam } from "../../types/interfaces";

const IconTitle = ({ icon, children }: IconTitleParam) => {
  return (
    <span className="flex items-center text-blue-950 text-opacity-95">
      {icon}
      <h1 className="text-3xl">{children}</h1>
    </span>
  );
};

export default IconTitle;
