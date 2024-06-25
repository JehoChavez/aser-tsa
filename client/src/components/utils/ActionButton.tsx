import { ActionButtonInterface } from "../../types/interfaces";

const ActionButton = ({ title, onClick, children }: ActionButtonInterface) => {
  return (
    <button
      className="w-full lg:w-auto p-1 mx-1 bg-gray-100 flex items-center justify-center border border-blue-950 rounded text-blue-950 hover:bg-gray-300 active:bg-gray-500 shadow shadow-gray-400"
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
