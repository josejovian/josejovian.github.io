import { ReactNode } from "react";

export interface PostTitleProps {
	children: ReactNode;
}

export function PostTitle({ children }: PostTitleProps) {
	return <h1 className="text-6xl">{children}</h1>;
}
