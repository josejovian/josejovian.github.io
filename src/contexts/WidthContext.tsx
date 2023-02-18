import { createContext } from "react";
import { SetStateType } from "../types";

const defaultContextValue: WidthContextProps = {
  width: 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setWidth: () => {},
};

export interface WidthContextProps {
  width: number;
  setWidth?: SetStateType<number>;
}

export const WidthContext = createContext(defaultContextValue);
