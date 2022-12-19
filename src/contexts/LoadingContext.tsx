import { createContext } from "react";
import { SetStateType } from "../types";

const defaultContextValue: LoadingContextProps = {
	loading: false,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setLoading: () => {},
};

export interface LoadingContextProps {
	loading: boolean;
	setLoading?: SetStateType<boolean>;
}

export const LoadingContext = createContext(defaultContextValue);
