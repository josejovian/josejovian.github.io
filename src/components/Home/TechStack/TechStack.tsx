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
import React, { useContext } from "react";
import Tag from "../../Generic/Tag/Tag";
import { ModeContext } from "@/src/contexts/ModeContext";

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
			};
		case "css":
			return {
				icon: <SiCss3 {...largeIcon} />,
				text: "CSS",
				color: "#1572B6",
			};
		case "javascript":
			return {
				icon: <SiJavascript {...largeIcon} />,
				text: "Javascript",
				color: "#F7DF1E",
			};
		case "typescript":
			return {
				icon: <SiTypescript {...largeIcon} />,
				text: "Typescript",
				color: "#3178C6",
			};
		case "react":
			return {
				icon: <SiReact {...largeIcon} />,
				text: "React.js",
				color: "#61DAFB",
			};
		case "next":
			return {
				icon: <SiNextdotjs {...largeIcon} />,
				text: "Next.js",
				color: "#FFFFFF",
				color2: "black",
			};
		case "firebase":
			return {
				icon: <SiFirebase {...largeIcon} />,
				text: "Firebase",
				color: "#FFCA28",
			};
		case "mongo":
			return {
				icon: <SiMongodb {...largeIcon} />,
				text: "MongoDB",
				color: "#47A248",
			};
		case "express":
			return {
				icon: <SiExpress {...largeIcon} />,
				text: "Express",
				color: "#FFFFFF",
				color2: "black",
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
	const mode = useContext(ModeContext);

	return (
		<div className="flex flex-wrap gap-4">
			{passedTechs.map((tech) => {
				const { icon, text, color, color2 } = getTech(tech);
				return (
					<Tag
						key={tech}
						style={{ color: mode ? color : (color2) ? color2 : color }}
					>
						{icon}
						<span className="col-text">{text}</span>
					</Tag>
				);
			})}
		</div>
	);
}
