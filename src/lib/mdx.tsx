import { ProjectProps } from "../types/Project";

const { readdirSync, readFileSync } = require("fs");
const { join } = require("path");
const { bundleMDX } = require("mdx-bundler");

async function readProject(id: string) {
	const result = await readFileSync(
		join(process.cwd(), "projects", `${id}.mdx`),
		"utf8"
	);

	return result;
}

async function readProjects() {
	const result = readdirSync(join(process.cwd(), "projects"), "utf8");

	return result;
}

async function getProject(_id: string) {
	const result = await readProject(_id);

	const data = await bundleMDX({
		source: result,
	});

	const { id, title, techs, overview, featured, hidden }: ProjectProps =
		data.frontmatter;

	return {
		id: id,
		title: title,
		techs: techs,
		featured: featured,
		hidden: hidden,
		overview: overview,
	};
}

async function getProjects() {
	const projects = await readProjects();
	const result = await Promise.all(
		projects.map(async (filename: string) => {
			const data = await bundleMDX({
				source: readFileSync(
					join(process.cwd(), "projects", `${filename}`),
					"utf8"
				),
			});
			const {
				id,
				title,
				techs,
				overview,
				featured,
				hidden,
			}: ProjectProps = data.frontmatter;

			return {
				id: id,
				title: title,
				techs: techs,
				featured: featured,
				hidden: hidden,
				overview: overview,
			};
		})
	);

	return result;
}

module.exports = {
	readProject,
	readProjects,
	getProject,
	getProjects,
};
