import clsx from "clsx";
import Link from "next/link";
import { SectionType } from "@/src/types";

export interface AnchorProps {
	head: SectionType;
	depth: number;
	active?: boolean;
	onClick?: () => void;
}

export function PostContentTableAnchor({
	head,
	depth,
	active,
	onClick,
}: AnchorProps) {
	return (
		<div
			className={clsx(
				"Anchor",
				"relative h-fit -mx-8",
				active && "bg-blue-100 dark:bg-slate-600"
			)}
			onClick={onClick}
		>
			{active && (
				<div
					className={clsx(
						"ProjectPost_table-arrow",
						"absolute top-3"
					)}
				/>
			)}
			<Link
				href={`#${head.link}`}
				className={clsx("block pr-8", "leading-10")}
				style={{
					paddingLeft: `${(depth - 1) * 2 + 2}rem`,
				}}
			>
				{head.name}
			</Link>
		</div>
	);
}
