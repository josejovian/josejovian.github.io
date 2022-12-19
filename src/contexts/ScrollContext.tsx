import React, { SetStateAction } from "react";
import { createContext } from "react";

const defaultContextValue: ScrollContextProps = {
	scroll: 0,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setScroll: () => {},
};

export interface ScrollContextProps {
	scroll: number;
	setScroll?: React.Dispatch<SetStateAction<number>>;
}

export const ScrollContext = createContext(defaultContextValue);
