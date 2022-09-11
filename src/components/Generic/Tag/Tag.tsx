import clsx from "clsx";
import React from "react";

interface TagProps {
	children: React.ReactNode;
	className: string;
	style: any;
}

export default function Tag({ children, className, style }: Partial<TagProps>) {
	return (
		<span
			className={clsx(
				"w-fit px-4 py-2",
				"flex items-center justify-center gap-4",
				"col-tertiary col-text shadow-lg rounded-sm",
				className
			)}
			style={style}
		>
			{children}
		</span>
	);
}
