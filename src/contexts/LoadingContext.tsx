import React, { SetStateAction } from "react";
import { createContext } from "react";

const defaultContextValue: LoadingContextProps = {
	loading: false,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setLoading: () => {},
};

export interface LoadingContextProps {
	loading: boolean;
	setLoading?: React.Dispatch<SetStateAction<boolean>>;
}

export const LoadingContext = createContext(defaultContextValue);
