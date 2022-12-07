import clsx from "clsx";
import List from "@/src/components/Home/List/List";
import TechStack from "@/src/components/Home/TechStack/TechStack";
import { ProjectCard } from "@/src/components";
import { ProjectProps } from "@/src/types/Project";
import { Meta } from "@/src/components/Generic/Layout/Layout";

const featuredProjects = ["bncc-x-tiket-movies", "lade", "trellone"];

const techStacks = [
	"html",
	"css",
	"javascript",
	"typescript",
	"react",
	"next",
	"firebase",
	"mongo",
	"express",
	"node",
];

interface HomeProps {
	projects: ProjectProps[];
}

const Home = ({ projects }: HomeProps) => {
	return (
		<main className={clsx("w-full h-full py-16", "flex flex-col gap-16")}>
			<Meta title="Jose Jovian" />
			<section className="flex flex-col gap-4">
				<h1 className="text-6xl">Hey! Jose here.</h1>
				<p>
					I am an undergraduate computer science student, and an
					aspiring front-end developer. I am particularly interested
					in web development, especially React. I create personal
					projects to test out the things I have learnt.
				</p>
				<TechStack passedTechs={techStacks} />
			</section>
			<section>
				<h2 className="text-4xl text-center mb-8">Journey</h2>
				<div>
					<List />
				</div>
			</section>
			<section>
				<h2 className="text-4xl text-center mb-8">Projects</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 3xl:gap-16">
					{projects.map((project) => {
						return <ProjectCard key={project.id} {...project} />;
					})}
				</div>
			</section>
		</main>
	);
};

export const getStaticProps = async (req: any) => {
	const { getProject } = require("../src/lib/mdx.tsx");

	let projects: ProjectProps[] = [];

	try {
		for (const id of featuredProjects) {
			const featured = await getProject(id);
			projects.push(featured);
		}
	} catch (e) {}

	return {
		props: { projects: projects },
		revalidate: 300,
	};
};

export default Home;
