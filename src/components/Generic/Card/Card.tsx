import clsx from "clsx";
import {
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import { motion } from "framer-motion";
import { WidthContext } from "@/src/contexts";
import { useMetrics } from "@/src/hooks";

export interface CardProps {
	id: string;
	children: ReactNode;
	href?: string;
	thumbSrc?: string;
	thumbTitle?: string;
	overrideWidth?: number;
}

export function Card({
	id,
	children,
	href,
	thumbSrc,
	thumbTitle,
	overrideWidth,
}: CardProps) {
	const { width } = useMetrics();
	const [cardThumbnailWidth, setCardThumbnailWidth] = useState(0);

	const renderCardThumbnail = useMemo(
		() =>
			thumbSrc && (
				<Image
					className="!w-full no-drag-select aspect-video"
					src={thumbSrc}
					width={cardThumbnailWidth}
					height={(cardThumbnailWidth * 9) / 16}
					alt={thumbTitle}
				/>
			),
		[cardThumbnailWidth, thumbSrc, thumbTitle]
	);

	const renderCardContents = useMemo(
		() => (
			<div className="relative w-full p-8 secondary border-t col-text">
				{children}
			</div>
		),
		[children]
	);

	const renderCardWrapper = useMemo(
		() => (
			<motion.article
				id={id}
				className={clsx(
					"relative",
					"flex flex-col w-fit secondary border",
					"rounded-sm overflow-hidden"
				)}
				whileTap={{ scale: 1.1 }}
				whileHover={{ scale: 1.05 }}
			>
				{renderCardThumbnail}
				{renderCardContents}
			</motion.article>
		),
		[id, renderCardContents, renderCardThumbnail]
	);

	const handleAdjustCardThumbnail = useCallback(() => {
		const card = document.getElementById(id);

		if (card) {
			setCardThumbnailWidth(overrideWidth || card.offsetWidth);
		}
	}, [id, overrideWidth]);

	useEffect(() => {
		handleAdjustCardThumbnail();
	}, [overrideWidth, width, handleAdjustCardThumbnail]);

	return href ? (
		<Link href={href}>{renderCardWrapper}</Link>
	) : (
		<>{renderCardWrapper}</>
	);
}
