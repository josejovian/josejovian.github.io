import { useMemo } from "react";
import { ContentComponentGenericProps } from "@/src/types";
import { PostDetailDate, PostDetailAuthor } from "@/src/components";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PostContentDetailProps extends ContentComponentGenericProps {}

export function PostContentDetail({
	contentType,
	contentDetail,
}: PostContentDetailProps) {
	const { date } = contentDetail;

	const renderProjectDetail = useMemo(() => <></>, []);

	const renderBlogDetail = useMemo(
		() => (
			<>
				<PostDetailAuthor />
				<PostDetailDate date={date} />
			</>
		),
		[date]
	);

	const renderPostDetail = useMemo(
		() => (
			<>
				{contentType === "projects" && renderProjectDetail}
				{contentType === "blogs" && renderBlogDetail}
			</>
		),
		[contentType, renderBlogDetail, renderProjectDetail]
	);

	return <div className="flex gap-4">{renderPostDetail}</div>;
}
