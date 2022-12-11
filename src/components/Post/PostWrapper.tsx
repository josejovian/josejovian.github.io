import clsx from "clsx";
import { ReactNode } from "react";

export interface PostWrapperProps {
	children: ReactNode;
}

export function PostWrapper({ children }: PostWrapperProps) {
	return (
		<main className={clsx("w-full h-full py-16", "flex flex-col gap-16")}>
			{children}
		</main>
	);
}
