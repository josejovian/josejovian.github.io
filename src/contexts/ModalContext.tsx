import { createContext } from "react";
import { SetStateType } from "../types";

export interface ModalType {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface ModalContextProps {
  modal: ModalType;
  setModal: SetStateType<ModalType>;
}

export const defaultModal: ModalType = {
  src: "",
  width: 0,
  height: 0,
  alt: "",
};

const defaultContextValue: ModalContextProps = {
  modal: defaultModal,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setModal: () => {},
};

export const ModalContext = createContext(defaultContextValue);
