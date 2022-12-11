import { GreatSectionType, SectionType } from "@/src/types";
import clsx from "clsx";
import { useCallback, useEffect, Fragment, useState } from "react";
import { Anchor } from "./Anchor";

export interface SideProps {
	table: GreatSectionType[];
	scroll: number;
}

export function Side({ scroll, table }: SideProps) {
	const [active, setActive] = useState<string>("");

	const trackSection = useCallback(() => {
		const flattenTable: SectionType[] = [];

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

		for (let i = 0; i < flattenTable.length; i++) {
			const section = flattenTable[i],
				prevSection = flattenTable[i - 1];

			if (!section.position) continue;

			if (section.position >= scroll + 300) {
				setActive(prevSection ? prevSection.name : section.name);
				break;
			} else if (section.position >= scroll + 100)
				setActive(section.name);
		}
	}, [active, scroll, table]);

	useEffect(() => {
		trackSection();
	}, [trackSection]);

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
									<Anchor
										key={sub.name}
										head={sub}
										depth={2}
										active={active === sub.name}
									/>
								);
							}
						);

						return (
							<li key={head.name}>
								<Anchor
									head={head}
									depth={1}
									active={active === head.name}
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
