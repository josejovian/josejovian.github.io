import React, { SetStateAction } from "react";
import { createContext } from "react";

const defaultContextValue : LoadingContextProps = {
	loading: false,
	setLoading: () => {},
};

export interface LoadingContextProps {
	loading: boolean;
	setLoading?: React.Dispatch<SetStateAction<any>>;
}

export const LoadingContext = createContext(defaultContextValue);