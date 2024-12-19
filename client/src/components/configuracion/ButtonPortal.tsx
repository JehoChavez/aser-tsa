import { ReactNode } from "react";
import ReactDOM from "react-dom";

const ButtonPortal = ({ children }: { children: ReactNode }) => {
  const portalRoot = document.getElementById("button-portal-root");

  return portalRoot ? ReactDOM.createPortal(children, portalRoot) : null;
};

export default ButtonPortal;
