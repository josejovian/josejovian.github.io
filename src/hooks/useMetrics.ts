import { useContext, useEffect, useState, useCallback } from "react";
import { ScrollContext, WidthContext } from "@/src/contexts";

export function useWidth() {
	const { width } = useContext(WidthContext);
	const [initWidth, setInitWidth] = useState(width);

	const handleGetInitialWidth = useCallback(() => {
		setInitWidth(document.documentElement.offsetWidth);
	}, []);

	useEffect(() => {
		handleGetInitialWidth();
	}, [handleGetInitialWidth]);

	return width === 0 ? initWidth : width;
}

export function useScroll() {
	const { scroll } = useContext(ScrollContext);
	return scroll;
}
