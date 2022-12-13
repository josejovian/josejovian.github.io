import { useCallback, useEffect, useState } from "react";
import { GreatSectionType } from "@/src/types";

export interface useTableProps {
	width: number;
}

export function useTable({ width }: useTableProps) {
	const [table, setTable] = useState<GreatSectionType[]>([]);
	const [thumbnailWidth, setThumbnailWidth] = useState(0);
	const [bodyPictureWidth, setBodyPictureWidth] = useState(0);

	const handleSetupThumbnail = useCallback(() => {
		const projectBody: HTMLElement | null =
				document.getElementById("ProjectPost_body"),
			projectBodyMD: HTMLElement | null = document.querySelector(
				"#ProjectPost_body section"
			);

		if (projectBody && projectBodyMD) {
			setThumbnailWidth(projectBody.offsetWidth);
			setBodyPictureWidth(projectBodyMD.offsetWidth);
		}
	}, []);

	useEffect(() => {
		handleSetupThumbnail();
	}, [handleSetupThumbnail, width]);

	const lineify = useCallback((str: string) => {
		return str.replace(/\s/g, "-").toLowerCase();
	}, []);

	const handleBuildTable = useCallback(() => {
		const temp: GreatSectionType[] = [];

		const section: GreatSectionType = {
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
	}, [lineify]);

	useEffect(() => {
		setTimeout(() => {
			handleBuildTable();
		}, 100);
	}, [handleBuildTable, width]);

	return {
		table,
		thumbnailWidth,
		bodyPictureWidth,
	};
}
