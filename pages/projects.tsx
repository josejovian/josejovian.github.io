import clsx from "clsx";
import { Meta, PostGrid } from "@/src/components";
import { ProjectType } from "@/src/types";

interface HomeProps {
	projects: ProjectType[];
}

const Projects = ({ projects }: HomeProps) => {
	return (
		<main className={clsx("w-full h-full py-16", "flex flex-col gap-16")}>
			<Meta page="Projects" />
			<h1 className="text-6xl">My Projects.</h1>
			<PostGrid
				id="projects"
				contentType="projects"
				contents={projects}
			/>
		</main>
	);
};

export const getStaticProps = async (req: any) => {
	const { getProjects } = require("../src/lib/mdx.tsx");

	let projects: ProjectType[] = await getProjects();

	return {
		props: { projects: projects },
		revalidate: 300,
	};
};

export default Projects;
