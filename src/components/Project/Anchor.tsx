import { Section } from "@/pages/project/[id]";
import clsx from "clsx";
import Link from "next/link";

export interface AnchorProps {
	head: Section;
	depth: number;
	active?: boolean;
}

export function Anchor({ head, depth, active }: AnchorProps) {
	return (
		<div className="relative w-full h-fit">
			{active && (
				<div
					className={clsx(
						"ProjectPost_table-arrow",
						"absolute -left-8 top-3"
					)}
				/>
			)}
			<Link
				href={`#${head.link}`}
				className={clsx("block -ml-8 -mr-8 pr-8", "leading-10")}
				style={{
					paddingLeft: `${(depth - 1) * 2 + 2}rem`,
				}}
			>
				{head.name}
			</Link>
		</div>
	);
}
