import clsx from "clsx";
import Image from "next/image";
import { useContext, useState } from "react";
import { Picture } from "../../Generic/Picture/Picture";

function alternate(idx: number, a: any, b: any) {
	return idx % 2 === 1 ? a : b;
}

export interface EntryType {
	name: string;
	addon: string;
	description: any;
	attachments: any[];
}

export interface EntryProps extends EntryType {
	idx: number;
	maxIdx: number;
}

export function Entry({
	idx,
	maxIdx,
	name,
	addon,
	description,
	attachments,
}: EntryProps) {
	return (
		<div
			className={clsx(
				"List_entry",
				"relative px-8 py-4",
				"bg-gray-100 dark:bg-stone-600 col-text",
				"rounded-sm shadow-lg overflow-hidden",
				alternate(
					idx,
					["pl-16 lg:pl-8 lg:pr-16", "lg:self-start"],
					["lg:self-end pl-16"]
				)
			)}
		>
			<div
				className={clsx(
					"List_entry-dot",
					"absolute 4 w-6 h-6",
					"bg-blue-400 rounded-full z-40",
					alternate(idx, "lg:right-3", "lg:left-3")
				)}
			/>
			{idx === maxIdx && (
				<div
					className={clsx(
						"List_line-cleaner",
						"absolute",
						alternate(idx, "lg:right-3.5", "lg:left-3.5"),
						"w-6 bg-inherit z-30"
					)}
				/>
			)}
			<h3 className="text-xl ">{name}</h3>
			<span className="text-sm ">{addon}</span>
			<div>
				<div className={clsx("text-left mt-2")}>{description}</div>
			</div>
			{attachments.length > 0 && (
				<div className={clsx("flex flex-wrap gap-4 mt-4")}>
					{attachments.map((att) => {
						return (
							<div key={att.title}>
								<Picture
									src={att.link}
									width={112}
									height={63}
									ogWidth={att.width ?? 1280}
									ogHeight={att.height ?? 720}
									alt={att.title}
								/>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
