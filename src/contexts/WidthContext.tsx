import React, { SetStateAction } from "react";
import { createContext } from "react";

const defaultContextValue: WidthContextProps = {
	width: 0,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setWidth: () => {},
};

export interface WidthContextProps {
	width: number;
	setWidth?: React.Dispatch<SetStateAction<number>>;
}

export const WidthContext = createContext(defaultContextValue);
