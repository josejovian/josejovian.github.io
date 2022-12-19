import { useContext } from "react";
import { ScrollContext, WidthContext } from "@/src/contexts";

export function useWidth() {
	const { width } = useContext(WidthContext);
	return width;
}

export function useScroll() {
	const { scroll } = useContext(ScrollContext);
	return scroll;
}
