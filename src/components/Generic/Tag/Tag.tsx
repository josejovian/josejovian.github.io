import clsx from "clsx";
import React from "react";
import { IconText } from "./IconText";

export interface TagProps {
	children: React.ReactNode;
	className?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	style?: any;
}

export function Tag({ children, className, style }: TagProps) {
	return (
		<IconText
			className={clsx(
				"w-fit px-4 py-2",
				"secondary border col-text rounded-sm",
				className
			)}
			style={style}
		>
			{children}
		</IconText>
	);
}
