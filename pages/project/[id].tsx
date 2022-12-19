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
import { PostDetailRequestProps, ProjectType } from "@/src/types";

interface PageProps {
	code: string;
	frontmatter: ProjectType;
}

const Projects = ({ code, frontmatter }: PageProps) => {
	const { id, title, overview, autoOverview } = frontmatter;
	const finalOverview = useMemo(
		() => overview ?? autoOverview,
		[autoOverview, overview]
	);
	const Component = useMemo(() => getMDXComponent(code), [code]);
	const width = useWidth();
	const scroll = useScroll();
	const { table, thumbnailWidth, bodyPictureWidth } = useTable({ width });

	return (
		<>
			<Meta page={title} description={finalOverview} />
			<PostContentWrapper>
				<PostContentHeader
					contentDetail={frontmatter}
					contentType="projects"
				/>
				<PostContentThumbnail
					contentType="projects"
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
	const { readProjects } = require("../../src/lib/mdx.tsx");

	const projects = await readProjects();

	return {
		paths: projects.map((project: string) => ({
			params: {
				id: project.replace(".mdx", ""),
			},
		})),
		fallback: false,
	};
};

export const getStaticProps = async (req: PostDetailRequestProps) => {
	const { id } = req.params;

	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { readProject } = require("../../src/lib/mdx.tsx");

	const projectMD = await readProject(id);

	const { code, frontmatter } = await bundleMDX({
		source: projectMD,
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

export default Projects;
