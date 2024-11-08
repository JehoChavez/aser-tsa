import { createContext } from "react";
import { EndososContextInterface } from "../types/interfaces";

export const defaultEndososContext: EndososContextInterface = {
  endosos: [],
  fetchEndosos: () => {},
  showForm: false,
  setShowForm: () => {},
  endosoToEdit: null,
  setEndosoToEdit: () => {},
  endosoToShow: null,
  setEndosoToShow: () => {},
};

export const EndososContext: React.Context<EndososContextInterface> =
  createContext(defaultEndososContext);
