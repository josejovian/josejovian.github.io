import { useContext, useEffect, useState, useCallback } from "react";
import { ScrollContext, WidthContext } from "@/src/contexts";

export function useMetrics() {
	const { width } = useContext(WidthContext);
	const { scroll } = useContext(ScrollContext);
	const [initWidth, setInitWidth] = useState(width);

	const handleGetInitialWidth = useCallback(() => {
		setInitWidth(document.documentElement.offsetWidth);
	}, []);

	useEffect(() => {
		handleGetInitialWidth();
	}, [handleGetInitialWidth]);

	return {
		width: width === 0 ? initWidth : width,
		scroll,
	};
}
