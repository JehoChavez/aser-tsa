import { ModalProps } from "../types/interfaces";
import { createPortal } from "react-dom";

const Modal = ({ size, closeBtn, onClose, children }: ModalProps) => {
  let sizeClassnames = "h-1/3 w-1/4";
  if (size === "medium") {
    sizeClassnames = "h-1/2 w-1/2";
  } else if (size === "large") {
    sizeClassnames = "h-3/4 w-2/3";
  }

  return createPortal(
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"></div>
      <div className="fixed h-screen w-screen flex justify-center items-center z-50 top-0">
        <div
          className={`bg-gray-200 p-2 shadow-gray-600 shadow-xl flex flex-col ${sizeClassnames}`}
        >
          {closeBtn && (
            <div className="mb-1">
              <button className="float-right" onClick={onClose}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-x-circle-fill text-red-500"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                </svg>
              </button>
            </div>
          )}
          <div className="w-full h-full flex flex-col">{children}</div>
        </div>
      </div>
    </>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;
