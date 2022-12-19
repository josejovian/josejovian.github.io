import { Picture } from "@/src/components";
import { contentDetailLink } from "@/src/constants";
import { ContentType } from "@/src/types";

export interface PostContentThumbnailProps {
	contentType: ContentType;
	id: string;
	title: string;
	thumbnailWidth: number;
}

export function PostContentThumbnail({
	contentType,
	id,
	title,
	thumbnailWidth,
}: PostContentThumbnailProps) {
	return (
		<div className="w-full">
			<Picture
				src={`${contentDetailLink(contentType, id)}.png`}
				width={thumbnailWidth}
				height={(thumbnailWidth * 9) / 16}
				alt={title}
				zoomable={false}
			/>
		</div>
	);
}
