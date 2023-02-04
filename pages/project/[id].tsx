import { bundleMDX } from "mdx-bundler";
import { PostDetailRequestProps, ProjectType } from "@/src/types";
import { PostTemplate } from "@/src/components";

interface PageProps {
	code: string;
	frontmatter: ProjectType;
}

const Projects = ({ code, frontmatter }: PageProps) => {
	return (
		<PostTemplate code={code} frontmatter={frontmatter} type="projects" />
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
