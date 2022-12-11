import clsx from "clsx";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import { motion } from "framer-motion";
import { getTech, PostDetailDate } from "@/src/components";
import { WidthContext } from "@/src/contexts";
import { ContentComponentGenericProps, ProjectType } from "@/src/types";
import { contentDetailLink } from "@/src/constants";

export interface PostCardProps extends ContentComponentGenericProps {}

export function PostCard({ contentType, contentDetail }: PostCardProps) {
	const { id, title, date, overview, autoOverview } = contentDetail;
	const { width } = useContext(WidthContext);
	const identifier = `ProjectCard_${id}`;
	const [cardThumbnailWidth, setCardThumbnailWidth] = useState(0);

	const renderPostCardThumbnail = useMemo(
		() => (
			<Image
				className="!w-full no-drag-select aspect-video"
				src={`${contentDetailLink(contentType, id)}.png`}
				width={cardThumbnailWidth}
				height={(cardThumbnailWidth * 9) / 16}
				alt={title}
			/>
		),
		[cardThumbnailWidth, contentType, id, title]
	);

	const renderPostCardHeader = useMemo(
		() => (
			<>
				<h3
					className={clsx(
						"ProjectCard_title",
						"text-2xl font-semibold mb-2"
					)}
				>
					{title}
				</h3>
				<div className="flex gap-2">
					<PostDetailDate date={date} />
				</div>
			</>
		),
		[date, title]
	);

	const renderPostCardBody = useMemo(
		() => (
			<p className={clsx("ProjectCard_description mt-1", "leading-8")}>
				{overview || autoOverview}
			</p>
		),
		[autoOverview, overview]
	);

	const renderPostCardFooter = useMemo(
		() =>
			contentType === "projects" && (
				<div className="flex flex-wrap gap-2 mt-4">
					{(contentDetail as ProjectType).techs.map((tech) => {
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
			),
		[contentDetail, contentType, title]
	);

	const renderPostCardContents = useMemo(
		() => (
			<div className="relative w-full p-8 secondary border-t col-text">
				{renderPostCardHeader}
				{renderPostCardBody}
				{renderPostCardFooter}
			</div>
		),
		[renderPostCardBody, renderPostCardFooter, renderPostCardHeader]
	);

	const handleAdjustCardThumbnail = useCallback(() => {
		const card = document.getElementById(identifier);

		if (card) {
			setCardThumbnailWidth(card.offsetWidth);
		}
	}, [identifier]);

	useEffect(() => {
		handleAdjustCardThumbnail();
	}, [width, handleAdjustCardThumbnail]);

	return (
		<Link href={contentDetailLink(contentType, id)}>
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
				{renderPostCardThumbnail}
				{renderPostCardContents}
			</motion.article>
		</Link>
	);
}
