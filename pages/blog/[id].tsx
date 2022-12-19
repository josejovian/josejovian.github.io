import { useMemo } from "react";
import { bundleMDX } from "mdx-bundler";
import { getMDXComponent } from "mdx-bundler/client";
import {
	Meta,
	PostContentBody,
	PostContentHeader,
	PostContentThumbnail,
	PostContentWrapper,
} from "@/src/components";
import { useScroll, useTable, useWidth } from "@/src/hooks";
import { BlogType, PostDetailRequestProps } from "@/src/types";

interface PageProps {
	code: string;
	frontmatter: BlogType;
}

const Blogs = ({ code, frontmatter }: PageProps) => {
	const { id, title, overview, autoOverview } = frontmatter;
	const Component = useMemo(() => getMDXComponent(code), [code]);
	const width = useWidth();
	const scroll = useScroll();
	const { table, thumbnailWidth, bodyPictureWidth } = useTable({ width });

	return (
		<>
			<Meta page={title} description={overview ?? autoOverview} />
			<PostContentWrapper>
				<PostContentHeader
					contentDetail={frontmatter}
					contentType="blogs"
				/>
				<PostContentThumbnail
					contentType="blogs"
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
};

export const getStaticPaths = async () => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { readBlogs } = require("../../src/lib/mdx.tsx");

	const blogs = await readBlogs();

	return {
		paths: blogs.map((blog: string) => ({
			params: {
				id: blog.replace(".mdx", ""),
			},
		})),
		fallback: false,
	};
};

export const getStaticProps = async (req: PostDetailRequestProps) => {
	const { id } = req.params;

	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { readBlog } = require("../../src/lib/mdx.tsx");

	const blogMD = await readBlog(id);

	const { code, frontmatter } = await bundleMDX({
		source: blogMD,
	});

	const result = {
		code,
		frontmatter: {
			id: id || null,
			...frontmatter,
		},
	};

	return {
		props: { ...result },
		revalidate: 300,
	};
};

export default Blogs;
