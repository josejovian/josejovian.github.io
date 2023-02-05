import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { PostContentTableAnchor } from "./PostContentTableAnchor";
import { GreatSectionType, SectionType } from "@/src/types";

export interface SideProps {
	table: GreatSectionType[];
	scroll: number;
	onChangeActive?: (active: string) => void;
}

export function PostContentTable({ scroll, table, onChangeActive }: SideProps) {
	const [active, setActive] = useState<string>("");

	const handleTrackSections = useCallback(() => {
		const flattenTable: (SectionType | undefined)[] = [];

		table.forEach((section) => {
			flattenTable.push({
				...section,
				tier: 1,
			});
			section.subsections.forEach((subsection) => {
				flattenTable.push({
					...subsection,
					tier: 2,
				});
			});
		});

		if (active === "" && flattenTable[0] && flattenTable[0].name) {
			setActive(flattenTable[0].name);
		}

		let newDestination = "Error";

		// https://stackoverflow.com/questions/3898130/check-if-a-user-has-scrolled-to-the-bottom-not-just-the-window-but-any-element#comment92747215_34550171
		const element = document.querySelector("#App_ext");
		if (!element) return;

		const unscrolledHeight = Math.abs(
			element.scrollHeight - element.scrollTop - element.clientHeight
		);
		const isAtBottom = Math.abs(unscrolledHeight) <= 3.0;

		for (let i = 0; i < flattenTable.length; i++) {
			const section = flattenTable[i];

			if (!section) continue;

			if (
				scroll + 8 >= section.position ||
				(i + 1 === flattenTable.length && isAtBottom)
			) {
				newDestination = section.link;
			}
		}

		setActive(newDestination);
		onChangeActive && onChangeActive(newDestination);
	}, [active, onChangeActive, scroll, table]);

	useEffect(() => {
		handleTrackSections();
	}, [handleTrackSections, scroll]);

	return (
		<aside
			id="ProjectPost_table"
			className={clsx("hidden lg:block", table.length === 0 && "!hidden")}
		>
			<div
				className={clsx(
					"md:sticky top-32 p-8",
					"secondary col-text",
					"rounded-sm border border-l-4 !border-l-blue-400"
				)}
			>
				<h4 className="!mt-0 !mb-4 text-2xl">Table of Contents</h4>
				<ul className="relative">
					{table.map((head: GreatSectionType, idx) => {
						const sectionElements = head.subsections.map(
							(sub: SectionType) => {
								return (
									<PostContentTableAnchor
										key={sub.name}
										head={sub}
										depth={2}
										active={active === sub.link}
										onClick={() => setActive(sub.link)}
									/>
								);
							}
						);

						return (
							<li key={head.link}>
								<PostContentTableAnchor
									head={head}
									depth={1}
									active={active === head.link}
								/>
								{sectionElements}
							</li>
						);
					})}
				</ul>
			</div>
		</aside>
	);
}
