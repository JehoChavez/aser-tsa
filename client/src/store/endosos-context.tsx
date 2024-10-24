import { createContext } from "react";
import { EndososContextInterface } from "../types/interfaces";

export const defaultEndososContext: EndososContextInterface = {
  endosos: [],
  fetchEndosos: () => {},
};

export const EndososContext: React.Context<EndososContextInterface> =
  createContext(defaultEndososContext);
