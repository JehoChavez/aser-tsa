import { ReactNode } from "react";

const DropdownButton = ({
  onClick,
  children,
  disabled,
}: {
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
}) => {
  return (
    <button
      className="w-full hover:bg-gray-200 active:bg-gray-500 active:text-white rounded text-left px-1 disabled:bg-gray-200 disabled:text-gray-500 disabled:hover:cursor-not-allowed"
      onClick={disabled ? () => {} : onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default DropdownButton;
