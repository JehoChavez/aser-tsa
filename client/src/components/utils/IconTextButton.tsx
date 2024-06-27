import { IconTextButtonInterface } from "../../types/interfaces";

const IconTextButton = ({
  icon,
  children,
  width = "w-auto",
  height = "heightAuto",
  bgColor = "bg-blue-950",
  textColor = "text-neutral-100",
  hover = "bg-indigo-950",
  onClick,
}: IconTextButtonInterface) => {
  return (
    <button
      className={`${height} ${width} px-2 rounded flex items-center justify-evenly ${bgColor} ${textColor} hover:${hover}`}
      onClick={onClick}
    >
      <span>{icon}</span>
      {children}
    </button>
  );
};

export default IconTextButton;
