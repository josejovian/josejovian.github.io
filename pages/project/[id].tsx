import clsx from "clsx";
import { useContext, useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { bundleMDX } from "mdx-bundler";
import { getMDXComponent } from "mdx-bundler/client";
import { Meta, Picture, PictureProps, Side } from "@/src/components";
import { WidthContext, ScrollContext } from "@/src/contexts";

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

interface PageProps {
	code: any;
	frontmatter: any;
}

export interface Section {
	name: string;
	link: string;
	position?: number;
	tier?: number;
}

export interface GreatSection extends Section {
	subsections: Section[];
}

const Projects = ({ code, frontmatter }: PageProps) => {
	const { id, title, techs, overview, repo, demo } = frontmatter;
	const Component = useMemo(() => getMDXComponent(code), [code]);

	const { width } = useContext(WidthContext);
	const { scroll } = useContext(ScrollContext);

	const [tableWidth, setTableWidth] = useState<number>(0);
	const [table, setTable] = useState<GreatSection[]>([]);
	const [thumbnailWidth, setThumbnailWidth] = useState<number>(0);
	const [bodyPictureWidth, setBodyPictureWidth] = useState<number>(0);
	const [initialBody, setInitialBody] = useState<number>(0);
	const [initialTable, setInitialTable] = useState<number>(0);
	const router = useRouter();

	const identifier: string = `ProjectCard_${id}`;

	useEffect(() => {
		const projectBody: HTMLElement | null =
				document.getElementById("ProjectPost_body"),
			projectBodyMD: HTMLElement | null = document.querySelector(
				"#ProjectPost_body section"
			);

		if (projectBody && projectBodyMD) {
			setThumbnailWidth(projectBody.offsetWidth);
			setBodyPictureWidth(projectBodyMD.offsetWidth);
		}
	}, [width, identifier]);

	function lineify(str: string) {
		return str.replace(/\s/g, "-").toLowerCase();
	}

	const buildTable = useCallback(
		(customWidth: number = 0) => {
			const temp: GreatSection[] = [];

			const section: GreatSection = {
				name: "",
				link: "",
				subsections: [],
			};

			const heads: NodeListOf<HTMLHeadElement> =
				document.querySelectorAll("h2, h3");

			heads.forEach((head, idx) => {
				head.id = lineify(head.innerText);
				head.classList.add("head-anchor");

				if (head.tagName === "H2") {
					if (
						(temp.length === 0 && section.name !== null) ||
						temp.length > 0
					) {
						temp.push({ ...section });
						section.subsections = [];
					}

					section.name = head.innerText;
					section.link = lineify(head.innerText);
					section.position =
						head.getBoundingClientRect().top -
						document.body.getBoundingClientRect().top +
						200;
				}

				if (head.tagName === "H3") {
					section.subsections.push({
						name: head.innerText,
						link: lineify(head.innerText),
						position:
							head.getBoundingClientRect().top -
							document.body.getBoundingClientRect().top +
							200,
					});
				}

				if (idx + 1 === heads.length && section.name !== "") {
					temp.push({ ...section });
					section.subsections = [];
				}
			});

			setTable(temp);
			setTableWidth(width);
		},
		[width]
	);

	useEffect(() => {
		setTimeout(() => {
			buildTable();
		}, 100);
	}, [buildTable]);

	return (
		<>
			<Meta page={title} />
			<main
				className={clsx("w-full h-full py-16", "flex flex-col gap-16")}
			>
				<h1 className="text-6xl">{title}</h1>
				<span></span>
				<div className="w-full">
					<Picture
						src={`/projects/${id}.png`}
						width={thumbnailWidth}
						height={(thumbnailWidth * 9) / 16}
						alt={title}
					/>
				</div>
				<div
					className="relative w-full flex gap-8"
					id="ProjectPost_body"
				>
					<section className="w-full lg:ProjectPost_body-md">
						<Component
							components={{
								img: ({
									src = "",
									width,
									height,
									alt = "",
								}) => {
									return (
										<Picture
											src={src}
											width={bodyPictureWidth}
											height={(bodyPictureWidth * 9) / 16}
											ogWidth={1280}
											ogHeight={720}
											alt={alt}
										/>
									);
								},
							}}
						/>
					</section>
					<Side width={width} scroll={scroll} table={table} />
				</div>
			</main>
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
