import React, { createContext, SetStateAction } from "react";

export interface ModalType {
	src: string;
	width: number;
	height: number;
	alt: string;
}

export interface ModalContextProps {
	modal: ModalType;
	setModal: React.Dispatch<SetStateAction<ModalType>>;
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
