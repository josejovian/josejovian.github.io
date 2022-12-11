import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import { motion } from "framer-motion";
import { getTech } from "@/src/components";
import { WidthContext } from "@/src/contexts";
import { ProjectType } from "@/src/types";

export interface ProjectCardProps extends ProjectType {}

export function ProjectCard({
	id,
	title,
	techs = [],
	overview,
}: ProjectCardProps) {
	const { width } = useContext(WidthContext);
	const identifier: string = `ProjectCard_${id}`;
	const [_width, _setWidth] = useState<number>(0);

	useEffect(() => {
		const projectCard: HTMLElement | null =
			document.getElementById(identifier);

		if (projectCard) {
			_setWidth(projectCard.offsetWidth);
		}
	}, [width, identifier]);

	return (
		<Link href={"/project/" + id}>
			<motion.article
				id={identifier}
				className={clsx(
					"relative",
					"flex flex-col w-fit secondary border",
					"rounded-sm overflow-hidden"
				)}
				whileTap={{ scale: 1.1 }}
				whileHover={{ scale: 1.05 }}
			>
				<Image
					className="!w-full no-drag-select aspect-video"
					src={`/projects/${id}.png`}
					width={_width}
					height={(_width * 9) / 16}
					alt={title}
				/>
				<div className="relative w-full p-8 secondary border-t col-text">
					<h3
						className={clsx(
							"ProjectCard_title",
							"text-2xl font-semibold mb-2"
						)}
					>
						{title}
					</h3>
					<p className={clsx("ProjectCard_description", "leading-8")}>
						{overview}
					</p>
					<div className="flex flex-wrap gap-2 mt-4">
						{techs.map((tech) => {
							return (
								<span
									key={`${title}-${tech}`}
									className={clsx(
										"px-2",
										"bg-gray-600 text-stone-100",
										"dark:bg-gray-200 dark:text-stone-800",
										"rounded-sm"
									)}
								>
									{getTech(tech).text}
								</span>
							);
						})}
					</div>
				</div>
			</motion.article>
		</Link>
	);
}
