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

interface PageProps {
	code: any;
	frontmatter: any;
}

const Projects = ({ code, frontmatter }: PageProps) => {
	const { id, title, techs, overview, repo, demo } = frontmatter;
	const Component = useMemo(() => getMDXComponent(code), [code]);
	const width = useWidth();
	const scroll = useScroll();
	const { table, thumbnailWidth, bodyPictureWidth } = useTable({ width });

	return (
		<>
			<Meta page={title} />
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

export const getStaticProps = async (req: any) => {
	const { id } = req.params;
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
