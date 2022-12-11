import { Picture } from "@/src/components";
import { ContentType } from "@/src/types";

export interface PostThumbnailProps {
	contentType: ContentType;
	id: string;
	title: string;
	thumbnailWidth: number;
}

export function PostThumbnail({
	contentType,
	id,
	title,
	thumbnailWidth,
}: PostThumbnailProps) {
	return (
		<div className="w-full">
			<Picture
				src={`/${contentType}/${id}.png`}
				width={thumbnailWidth}
				height={(thumbnailWidth * 9) / 16}
				alt={title}
				zoomable={false}
			/>
		</div>
	);
}
