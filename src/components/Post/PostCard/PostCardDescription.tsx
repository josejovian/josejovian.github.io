import clsx from "clsx";
import { ReactNode } from "react";

export interface PostCardDescriptionProps {
	children: ReactNode;
}

export function PostCardDescription({ children }: PostCardDescriptionProps) {
	return (
		<p className={clsx("ProjectCard_description mt-1", "leading-8")}>
			{children}
		</p>
	);
}
