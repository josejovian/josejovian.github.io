import React, { SetStateAction } from "react";
import { createContext } from "react";

export const defaultContextValue : ScrollContextProps = {
	scroll: 0,
	setScroll: () => {},
};

export interface ScrollContextProps {
	scroll: number;
	setScroll?: React.Dispatch<SetStateAction<any>>;
}

export const ScrollContext = createContext(defaultContextValue);