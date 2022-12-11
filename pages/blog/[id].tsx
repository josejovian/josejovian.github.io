import clsx from "clsx";
import { useContext, useEffect, useMemo, useState, useCallback } from "react";
import { bundleMDX } from "mdx-bundler";
import { getMDXComponent } from "mdx-bundler/client";
import {
	Meta,
	PostContentBody,
	PostContentHeader,
	PostContentThumbnail,
	PostContentWrapper,
} from "@/src/components";
import { WidthContext, ScrollContext } from "@/src/contexts";
import { useTable } from "@/src/hooks";

interface PageProps {
	code: any;
	frontmatter: any;
}

const Blogs = ({ code, frontmatter }: PageProps) => {
	const { id, title, techs, overview, repo, demo } = frontmatter;
	const Component = useMemo(() => getMDXComponent(code), [code]);

	const { width } = useContext(WidthContext);
	const { scroll } = useContext(ScrollContext);

	const { table, thumbnailWidth, bodyPictureWidth } = useTable({ width });

	return (
		<>
			<Meta page={title} />
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

export const getStaticProps = async (req: any) => {
	const { id } = req.params;
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
