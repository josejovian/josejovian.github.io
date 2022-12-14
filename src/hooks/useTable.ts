import { useCallback, useEffect, useRef, useState } from "react";
import { GreatSectionType } from "@/src/types";
import { lineify } from "@/src/utils";

export interface useTableProps {
	width: number;
	scroll?: number;
}

export function useTable({ width, scroll }: useTableProps) {
	const [table, setTable] = useState<GreatSectionType[]>([]);
	const [thumbnailWidth, setThumbnailWidth] = useState(0);
	const [bodyPictureWidth, setBodyPictureWidth] = useState(0);
	const tableGenerationCount = useRef(0);

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

	const handleBuildTable = useCallback(() => {
		const temp: GreatSectionType[] = [];

		const section: GreatSectionType = {
			name: "",
			link: "",
			position: 0,
			subsections: [],
		};

		const heads: NodeListOf<HTMLHeadElement> =
			document.querySelectorAll("h2, h3");

		let idx1 = -1;
		let idx2 = -1;
		heads.forEach((head, idx) => {
			head.id = lineify(head.innerText);
			head.classList.add("head-anchor");

			const position =
				head.getBoundingClientRect().top -
				document.body.getBoundingClientRect().top;

			if (head.tagName === "H2") {
				idx2 = -1;
				idx1++;
				if (
					(temp.length === 0 && section.name !== null) ||
					temp.length > 0
				) {
					temp.push({ ...section });
					section.subsections = [];
				}

				section.name = head.innerText;
				section.link = lineify(head.innerText);
				section.position = position;

				if (tableGenerationCount.current > 0) {
					setTable((prev) => {
						const temp = prev;
						if (temp[idx1]) temp[idx1].position = position;
						return temp;
					});
				}
			}

			if (head.tagName === "H3") {
				idx2++;
				section.subsections.push({
					name: head.innerText,
					link: lineify(head.innerText),
					position,
				});

				if (tableGenerationCount.current > 0) {
					setTable((prev) => {
						const temp = prev;
						if (temp[idx1] && temp[idx1].subsections[idx2])
							temp[idx1].subsections[idx2].position = position;
						return temp;
					});
				}
			}

			if (idx + 1 === heads.length && section.name !== "") {
				temp.push({ ...section });
				section.subsections = [];
			}
		});

		temp.splice(0, 1);
		if (tableGenerationCount.current === 0) setTable(temp);
		else tableGenerationCount.current++;
	}, []);

	useEffect(() => {
		setTimeout(() => {
			handleBuildTable();
		}, 100);
	}, [handleBuildTable, width, scroll]);

	useEffect(() => {
		tableGenerationCount.current = 0;
	}, [width]);

	return {
		table,
		thumbnailWidth,
		bodyPictureWidth,
	};
}
