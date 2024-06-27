import { IconTextButtonInterface } from "../../types/interfaces";

const IconTextButton = ({
  icon,
  children,
  width,
  height,
  bgColor,
  textColor,
  hover,
  onClick,
}: IconTextButtonInterface) => {
  width = width || "w-auto";
  height = height || "h-auto";
  bgColor = bgColor || "bg-blue-950";
  textColor = textColor || "text-neutral-100";
  hover = hover || "bg-indigo-950";

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
