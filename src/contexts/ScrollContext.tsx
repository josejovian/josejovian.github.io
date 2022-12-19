import { createContext } from "react";
import { SetStateType } from "../types";

const defaultContextValue: ScrollContextProps = {
	scroll: 0,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setScroll: () => {},
};

export interface ScrollContextProps {
	scroll: number;
	setScroll?: SetStateType<number>;
}

export const ScrollContext = createContext(defaultContextValue);
