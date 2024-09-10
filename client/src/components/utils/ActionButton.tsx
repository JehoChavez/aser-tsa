import { ActionButtonInterface } from "../../types/interfaces";

const ActionButton = ({
  title,
  onClick,
  children,
  color,
}: ActionButtonInterface) => {
  let colorClassnames =
    "bg-gray-100 border-blue-950 text-blue-950 hover:bg-gray-300 active:bg-gray-600 shadow active:text-white";

  if (color === "blue") {
    colorClassnames =
      "bg-blue-950 hover:bg-indigo-950 text-white active:bg-gray-900";
  }

  return (
    <button
      className={`w-full lg:w-auto p-1 mx-1 flex items-center justify-center border rounded shadow-gray-400 ${colorClassnames}`}
      title={title}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {children}
    </button>
  );
};

export default ActionButton;
