import { BlogType, ContentType, ProjectType } from "@/src/types";

const { readdirSync, readFileSync } = require("fs");
const { join } = require("path");
const { bundleMDX } = require("mdx-bundler");

function getFrontmatter(
	cat: ContentType,
	data: any | null
): ProjectType | BlogType | null {
	if (!data) return null;

	let frontmatter: ProjectType | BlogType;
	switch (cat) {
		case "projects":
			frontmatter = data.frontmatter as ProjectType;
			break;
		case "blogs":
			frontmatter = data.frontmatter as BlogType;
			break;
	}

	const string = data.matter.content;

	const date = new Date(frontmatter.date);

	const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

	return {
		...frontmatter,
		date: `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`,
		autoOverview: string.slice(0, Math.min(string.length, 256)),
	};
}

function readContent(cat: ContentType, id: string) {
	return readFileSync(join(process.cwd(), cat, `${id}.mdx`), "utf8");
}

function readContents(cat: ContentType) {
	return readdirSync(join(process.cwd(), cat), "utf8");
}

async function readProject(id: string) {
	return await readContent("projects", id);
}

async function readBlog(id: string) {
	return await readContent("blogs", id);
}

async function readProjects() {
	return readContents("projects") as string[];
}

async function readBlogs() {
	return readContents("blogs") as string[];
}

async function getContent(cat: ContentType, id: string) {
	let result = null;

	switch (cat) {
		case "projects":
			result = await readProject(id);
			break;
		case "blogs":
			result = await readBlog(id);
			break;
	}

	let data = null;

	if (!result) return null;

	data = await bundleMDX({
		source: result,
	});

	if (!data) return null;

	return getFrontmatter(cat, data);
}

async function getContents(cat: ContentType) {
	let result = null;

	switch (cat) {
		case "projects":
			result = await readProjects();
			break;
		case "blogs":
			result = await readBlogs();
			break;
	}

	if (!result) return null;

	return Promise.all(
		result.map(async (filename: string) => {
			const data = await bundleMDX({
				source: readFileSync(
					join(process.cwd(), cat, `${filename}`),
					"utf8"
				),
			});

			return getFrontmatter(cat, data);
		})
	);
}

async function getProject(_id: string) {
	return getContent("projects", _id);
}

async function getProjects() {
	return getContents("projects");
}

async function getBlog(_id: string) {
	return getContent("blogs", _id);
}

async function getBlogs() {
	return getContents("blogs");
}

module.exports = {
	readProject,
	readProjects,
	getProject,
	getProjects,
	readBlog,
	readBlogs,
	getBlog,
	getBlogs,
};
