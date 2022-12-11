import clsx from "clsx";
import { useEffect } from "react";
import { Meta, ProjectCard } from "@/src/components";
import { ProjectType } from "@/src/types";
import { PostCard } from "@/src/components/Post/PostCard";

interface HomeProps {
	projects: ProjectType[];
}

const Projects = ({ projects }: HomeProps) => {
	return (
		<main className={clsx("w-full h-full py-16", "flex flex-col gap-16")}>
			<Meta page="Projects" />
			<h1 className="text-6xl">My Projects.</h1>
			<section className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 3xl:gap-16">
				{projects.map((project) => {
					return (
						<PostCard
							contentType="projects"
							contentDetail={project}
							key={project.id}
						/>
					);
				})}
			</section>
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
