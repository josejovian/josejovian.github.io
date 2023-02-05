import { useMemo, useEffect, useCallback } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { useScroll, useTable, useWidth } from "@/src/hooks";
import { BlogType, ProjectType, ContentType } from "@/src/types";
import {
	Meta,
	PostContentBody,
	PostContentHeader,
	PostContentThumbnail,
	PostContentWrapper,
} from "@/src/components";

export interface PostTemplateProps {
	type: ContentType;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	code: any;
	frontmatter: BlogType | ProjectType;
}

export function PostTemplate({ type, code, frontmatter }: PostTemplateProps) {
	const { id, title, overview, autoOverview } = frontmatter;
	const finalOverview = useMemo(
		() => overview ?? autoOverview,
		[autoOverview, overview]
	);
	const Component = useMemo(() => getMDXComponent(code), [code]);
	const width = useWidth();
	const scroll = useScroll();
	const { table, thumbnailWidth, bodyPictureWidth } = useTable({
		width,
	});

	const handleRedirectToHash = useCallback((target?: string) => {
		if (window.location.hash) {
			setTimeout(() => {
				const hash = target ?? window.location.hash.slice(1);
				const element = document.getElementById(hash);
				element?.scrollIntoView();
			}, 1000);
		}
	}, []);

	useEffect(() => {
		handleRedirectToHash();
	}, [handleRedirectToHash]);

	return (
		<>
			<Meta page={title} description={finalOverview} />
			<PostContentWrapper>
				<PostContentHeader
					contentDetail={frontmatter}
					contentType={type}
				/>
				<PostContentThumbnail
					contentType={type}
					id={id}
					thumbnailWidth={thumbnailWidth}
					title={title}
				/>
				<PostContentBody
					bodyPictureWidth={bodyPictureWidth}
					Component={Component}
					scroll={scroll}
					table={table}
				/>
			</PostContentWrapper>
		</>
	);
}
