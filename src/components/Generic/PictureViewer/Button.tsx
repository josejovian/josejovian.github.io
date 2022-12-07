import clsx from "clsx";
import { MouseEventHandler } from "react";

export interface ActionButtonProps {
	icon: React.ReactNode,
	onClick: MouseEventHandler,
	disabled : boolean,
}

export function ActionButton({ disabled, icon, onClick }: Partial<ActionButtonProps>) {
	return (
		<button
			className={clsx(
				"p-4",
				"rounded-md",
				!disabled && "bg-stone-900 hover:bg-stone-800 active:bg-stone-700",
				disabled && "opacity-50 cursor-not-allowed",
			)}
			onClick={onClick}
			disabled={disabled}
		>
			{icon}
		</button>
	);
}
