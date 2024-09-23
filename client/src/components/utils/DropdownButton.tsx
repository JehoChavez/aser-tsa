import { ReactNode } from "react";

const DropdownButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) => {
  return (
    <button
      className="w-full hover:bg-gray-200 active:bg-gray-500 active:text-white rounded text-left px-1"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default DropdownButton;
