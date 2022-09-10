import React, { SetStateAction } from "react";
import { createContext } from "react";

export const defaultContextValue : WidthContextProps = {
	width: 0,
	setWidth: () => {},
};

export interface WidthContextProps {
	width: number;
	setWidth?: React.Dispatch<SetStateAction<any>>;
}

export const WidthContext = createContext(defaultContextValue);