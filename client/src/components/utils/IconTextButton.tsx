import { IconTextButtonInterface } from "../../types/interfaces";

const IconTextButton = ({
  icon,
  children,
  width = "w-auto",
  height = "height-auto",
  bgColor = "bg-blue-950",
  textColor = "text-neutral-100",
  hover = "bg-indigo-950",
  onClick,
  onRightClick,
}: IconTextButtonInterface) => {
  const handleRightClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onRightClick) {
      e.preventDefault();
      onRightClick();
    }
  };
  return (
    <button
      className={`${height} ${width} px-2 rounded flex items-center justify-evenly ${bgColor} ${textColor} hover:${hover}`}
      onClick={onClick}
      onContextMenu={handleRightClick}
    >
      <span>{icon}</span>
      {children}
    </button>
  );
};

export default IconTextButton;
