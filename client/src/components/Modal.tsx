import { ModalProps } from "../types/interfaces";
import { createPortal } from "react-dom";

const Modal = ({ size, children }: ModalProps) => {
  let sizeClassnames = "h-1/4 w-1/4";
  if (size === "medium") {
    sizeClassnames = "h-1/2 w-1/2";
  } else if (size === "large") {
    sizeClassnames = "h-2/3 w-2/3";
  }

  return createPortal(
    <>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed h-screen w-screen flex justify-center items-center z-50 top-0">
        <div className={`bg-white ${sizeClassnames}`}>{children}</div>
      </div>
    </>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;
