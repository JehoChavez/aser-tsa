import { IconTitleParam } from "../../types/interfaces";

const IconTitle = ({ icon, children }: IconTitleParam) => {
  return (
    <div className="flex items-center text-blue-950 text-opacity-95">
      <span className="flex items-center mr-2">{icon}</span>
      <h1 className="text-3xl">{children}</h1>
    </div>
  );
};

export default IconTitle;
