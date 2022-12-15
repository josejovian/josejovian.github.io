import { useContext } from "react";
import { ScrollContext, WidthContext } from "@/src/contexts";

export function useMetrics() {
	const { width } = useContext(WidthContext);
	const { scroll } = useContext(ScrollContext);

	return {
		width,
		scroll,
	};
}
