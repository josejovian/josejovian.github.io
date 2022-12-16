import clsx from "clsx";
import { useMemo, useCallback, useState, useEffect, createRef } from "react";
import {
	BlogType,
	ContentType,
	PostDescendantType,
	ProjectType,
} from "@/src/types";
import { BlogCard, ProjectCard } from "@/src/components";
import { useWidth } from "@/src/hooks";
import {
	GRID_THREE_COLUMNS_BREAKPOINT,
	GRID_TWO_COLUMNS_BREAKPOINT,
} from "@/src/constants";

interface PostGridProps {
	id: string;
	contentType: ContentType;
	contents: PostDescendantType[];
}

export function PostGrid({ id, contentType, contents }: PostGridProps) {
	const remainder = useMemo(
		() => (contents.length > 0 ? contents.length % 3 : 0),
		[contents.length]
	);

	const width = useWidth();
	const [cardWidth, setCardWidth] = useState<number | undefined>();

	const handleCalculateCardWidth = useCallback(() => {
		const postGrid = document.getElementById(id);
		let newWidth: number | undefined;
		if (width > 0 && postGrid) {
			if (width >= GRID_THREE_COLUMNS_BREAKPOINT) {
				newWidth = Math.floor((postGrid.clientWidth - 2 * 32) / 3);
			} else if (width >= GRID_TWO_COLUMNS_BREAKPOINT) {
				newWidth = Math.floor((postGrid.clientWidth - 32) / 2);
			} else {
				newWidth = undefined;
			}
		}

		setCardWidth(newWidth);
	}, [id, width]);

	useEffect(() => {
		handleCalculateCardWidth();
	}, [handleCalculateCardWidth, width]);

	const renderContents = useCallback(
		(objects: PostDescendantType[]) =>
			objects.map((content) => {
				const element = (() => {
					switch (contentType) {
						case "blogs":
							return (
								<BlogCard
									{...(content as BlogType)}
									key={content.id}
									width={cardWidth}
								/>
							);
						case "projects":
							return (
								<ProjectCard
									{...(content as ProjectType)}
									key={content.id}
									width={cardWidth}
								/>
							);
					}
				})(); //
				return <div key={content.id}>{element}</div>;
			}),
		[cardWidth, contentType]
	);

	const renderMainContents = useMemo(
		() => renderContents(contents.slice(0, contents.length - remainder)),
		[contents, remainder, renderContents]
	);

	const renderRemainderContents = useMemo(
		() => renderContents(contents.slice(contents.length - remainder)),
		[contents, remainder, renderContents]
	);

	return (
		<section className="PostGrid" id={id}>
			<div className="grid gap-8">{renderMainContents}</div>
			<div className="flex gap-8 mt-8 justify-center">
				{renderRemainderContents}
			</div>
		</section>
	);
}
