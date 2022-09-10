import clsx from "clsx";
import ProjectCard from "@/src/components/Project/Card";
import { ProjectProps } from "@/src/types/Project";
import { useEffect } from "react";
import Meta from "@/src/components/Generic/Layout/Layout";

interface HomeProps {
	projects: ProjectProps[];
}

const Projects = ({ projects }: HomeProps) => {
	useEffect(() => {
		console.log(projects);
	}, [projects]);

	return (
		<main className={clsx("w-full h-full py-16", "flex flex-col gap-16")}>
			<Meta page="Projects" />
			<h1 className="text-6xl">My Projects.</h1>
			<section className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 3xl:gap-16">
				{ projects.map((project) => {
					return (
						<ProjectCard key={project.id} {...project} />
					);
				}) }
			</section>
		</main>
	);
};

export const getStaticProps = async (req: any) => {
	const { getProjects } = require("../src/lib/mdx.tsx");

	let projects: ProjectProps[] = await getProjects();

	return {
		props: { projects: projects },
		revalidate: 300,
	};
};

export default Projects;
