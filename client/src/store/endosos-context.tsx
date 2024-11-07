import { createContext } from "react";
import { EndososContextInterface } from "../types/interfaces";

export const defaultEndososContext: EndososContextInterface = {
  endosos: [],
  fetchEndosos: () => {},
  showForm: false,
  setShowForm: () => {},
  endosoToEdit: null,
  setEndosoToEdit: () => {},
};

export const EndososContext: React.Context<EndososContextInterface> =
  createContext(defaultEndososContext);
