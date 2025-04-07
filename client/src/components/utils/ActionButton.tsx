import { ActionButtonInterface } from "../../types/interfaces";

const ActionButton = ({
  title,
  onClick,
  children,
  color,
  size,
  disabled,
  full,
  onRightClick,
}: ActionButtonInterface) => {
  let colorClassnames =
    "bg-gray-100 border-blue-950 text-blue-950 hover:bg-gray-300 active:bg-gray-600 shadow active:text-white disabled:hover:bg-gray-100 disabled:active:bg-gray-100 disabled:active:text-blue-950";

  if (color === "blue") {
    colorClassnames =
      "bg-blue-950 hover:bg-indigo-950 text-white active:bg-gray-900 disabled:hover:bg-blue-950 disabled:active:bg-blue-950";
  } else if (color === "red") {
    colorClassnames =
      "bg-red-600 hover:bg-red-700 active:bg-red-900 text-white disabled:hover:bg-red-600 disabled:active:bg-red-600";
  }

  return (
    <button
      className={`w-full ${
        full ? "" : "lg:w-auto"
      } p-1 mx-1 flex items-center justify-center border rounded shadow-gray-400 ${colorClassnames} ${
        size === "lg" ? "text-xl p-2" : ""
      } disabled:opacity-60 disabled:cursor-not-allowed`}
      title={title}
      onClick={() => {
        if (onClick && !disabled) {
          onClick();
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        if (onRightClick && !disabled) {
          onRightClick();
        }
      }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ActionButton;
