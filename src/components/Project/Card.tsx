import Image from "next/image";
import { ProjectProps } from "@/src/types/Project";
import clsx from "clsx";
import { getTech } from "../Home/TechStack/TechStack";
import { useContext, useEffect, useState } from "react";
import { WidthContext, WidthContextProps } from "@/src/contexts/WidthContext";
import { motion } from "framer-motion";
import Link from "next/link";

export interface ProjectCardProps extends ProjectProps {}

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
		<Link className="shadow-lg" href={"/project/" + id}>
			<a>
				<motion.article
					id={identifier}
					className={clsx(
						"relative",
						"flex flex-col w-fit",
						"rounded-sm overflow-hidden shadow-lg"
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
					<div className="relative w-full p-8 col-tertiary col-text">
						<h3
							className={clsx(
								"ProjectCard_title",
								"text-2xl font-semibold mb-2"
							)}
						>
							{title}
						</h3>
						<p
							className={clsx(
								"ProjectCard_description",
								"leading-8"
							)}
						>
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
			</a>
		</Link>
	);
}
