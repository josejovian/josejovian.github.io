import clsx from "clsx";
import { Meta, PostGrid } from "@/src/components";
import { ProjectType } from "@/src/types";

interface HomeProps {
	projects: ProjectType[];
}

const Projects = ({ projects }: HomeProps) => {
	return (
		<main className={clsx("w-full h-full py-16", "flex flex-col gap-16")}>
			<Meta
				page="Projects"
				description={clsx(
					"A page listing some projects I've done either as part of a class",
					"or simply just personal projects I do for fun."
				)}
			/>
			<h1 className="text-6xl">My Projects.</h1>
			<PostGrid
				id="projects"
				contentType="projects"
				contents={projects}
			/>
		</main>
	);
};

export const getStaticProps = async () => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { getProjects } = require("../src/lib/mdx.tsx");

	const projects: ProjectType[] = await getProjects();

	return {
		props: { projects },
		revalidate: 300,
	};
};

export default Projects;
