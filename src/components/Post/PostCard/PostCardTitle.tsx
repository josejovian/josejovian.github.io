import clsx from "clsx";
import { ReactNode } from "react";

export interface PostCardTitleProps {
	children: ReactNode;
}

export function PostCardTitle({ children }: PostCardTitleProps) {
	return (
		<h3
			className={clsx("ProjectCard_title", "text-2xl font-semibold mb-2")}
		>
			{children}
		</h3>
	);
}
