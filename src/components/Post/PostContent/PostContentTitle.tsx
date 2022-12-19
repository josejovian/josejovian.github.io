import { ReactNode } from "react";

export interface PostContentTitleProps {
	children: ReactNode;
}

export function PostContentTitle({ children }: PostContentTitleProps) {
	return <h1 className="text-6xl">{children}</h1>;
}
