import React, { createContext, SetStateAction } from "react";

export interface ModalType {
	src: string;
	width: number;
	height: number;
	alt: string;
}

export interface ModalContextProps {
	modal: ModalType;
	setModal: React.Dispatch<SetStateAction<any>>;
}

export const defaultModal: ModalType = {
	src: "",
	width: 0,
	height: 0,
	alt: "",
};

export const defaultContextValue: ModalContextProps = {
	modal: defaultModal,
	setModal: () => {},
};

export const ModalContext = createContext(defaultContextValue);