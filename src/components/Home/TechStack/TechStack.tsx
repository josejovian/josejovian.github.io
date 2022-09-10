import clsx from "clsx";
import {
	SiHtml5,
	SiCss3,
	SiJavascript,
	SiReact,
	SiNextdotjs,
	SiFirebase,
	SiMongodb,
	SiExpress,
	SiNodedotjs,
	SiRedux,
	SiTypescript,
} from "react-icons/si";
import React from "react";
import Tag from "../../Generic/Tag/Tag";

const largeIcon = {
	className: "w-8 h-8 text-inherit",
};

interface TechProps {
	icon: React.ReactNode;
	text: string;
	color: string;
	color2?: string;
}

export function getTech(tech: string): TechProps {
	switch (tech) {
		case "html":
			return {
				icon: <SiHtml5 {...largeIcon} />,
				text: "HTML",
				color: "#E34F26",
				color2: "orange",
			};
		case "css":
			return {
				icon: <SiCss3 {...largeIcon} />,
				text: "CSS",
				color: "#1572B6",
				color2: "blue",
			};
		case "javascript":
			return {
				icon: <SiJavascript {...largeIcon} />,
				text: "Javascript",
				color: "#F7DF1E",
				color2: "orange",
			};
		case "typescript":
			return {
				icon: <SiTypescript {...largeIcon} />,
				text: "Typescript",
				color: "#3178C6",
				color2: "blue",
			};
		case "react":
			return {
				icon: <SiReact {...largeIcon} />,
				text: "React.js",
				color: "#61DAFB",
				color2: "blue",
			};
		case "next":
			return {
				icon: <SiNextdotjs {...largeIcon} />,
				text: "Next.js",
				color: "#FFFFFF",
				color2: "white",
			};
		case "firebase":
			return {
				icon: <SiFirebase {...largeIcon} />,
				text: "Firebase",
				color: "#FFCA28",
				color2: "orange",
			};
		case "mongo":
			return {
				icon: <SiMongodb {...largeIcon} />,
				text: "MongoDB",
				color: "#47A248",
				color2: "green",
			};
		case "express":
			return {
				icon: <SiExpress {...largeIcon} />,
				text: "Express",
				color: "#FFFFFF",
				color2: "white",
			};
		case "node":
			return {
				icon: <SiNodedotjs {...largeIcon} />,
				text: "Node.js",
				color: "#339933",
			};
		case "redux":
			return {
				icon: <SiRedux {...largeIcon} />,
				text: "Redux",
				color: "#764ABC",
			};
		default:
			return {
				icon: <></>,
				text: "Unknown",
				color: "",
			};
	}
}

interface TechStackProps {
	passedTechs: string[];
}

export default function TechStack({ passedTechs }: TechStackProps) {
	return (
		<div className="flex flex-wrap gap-4">
			{passedTechs.map((tech) => {
				const { icon, text, color } = getTech(tech);
				return (
					<Tag key={tech} style={{ color: color }}>
						{icon}
						<span className="text-white">{text}</span>
					</Tag>
				);
			})}
		</div>
	);
}
