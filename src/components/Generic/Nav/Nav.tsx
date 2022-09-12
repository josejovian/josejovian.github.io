import Link from "next/link";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { NextRouter, useRouter } from "next/router";
import NavImage from "./NavImage.svg";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { StateModeType } from "@/src/types/Mode";

interface LinkType {
	name: string;
	link: string;
}

const links: LinkType[] = [
	{
		name: "me",
		link: "/",
	},
	{
		name: "projects",
		link: "/projects",
	},
];

interface NavProps {
	scroll: number;
	loading: boolean;
	stateMode: StateModeType;
	setPreferredMode: (mode: boolean) => void
}

export function Nav({ scroll, loading, stateMode, setPreferredMode }: NavProps) {
	const [mode, setMode] = stateMode;

	const router: NextRouter = useRouter();

	return (
		<nav
			id="Nav"
			className={clsx(
				"w-screen h-16",
				"fixed flex flex-col top-0",
				"col-secondary col-text",
				"border-0 z-50 overflow-hidden",
				scroll > 0 && "shadow-lg"
			)}
		>
			<div
				className={clsx(
					"h-1 bg-blue-400 z-50",
					"transition-all delay-300"
				)}
			/>
			<div
				className={clsx(
					"flex flex-row items-between justify-between",
					"w-full p-adaptive"
				)}
			>
				<div className="flex items-center justify-center">
					<Link href="/" passHref>
						<a>
							<div className={clsx("NavImage", "bg-blue-400")}>
								<svg width="108" height="28">
									<defs>
										<clipPath id="Nav_logo-clip">
											<NavImage id="Nav_logo" />
										</clipPath>
									</defs>
								</svg>
							</div>
						</a>
					</Link>
				</div>
				<ul className="flex items-center justify-center border-0 h-full">
					{links.map((link: LinkType) => {
						function isActive() {
							if (
								router.pathname.includes("project") &&
								link.link.includes("project")
							)
								return true;

							return router.pathname === link.link;
						}
						return (
							<li
								className={clsx(
									"Nav_link Pulsable",
									"relative flex flex-col items-center"
								)}
								key={`Nav_${link.name}`}
							>
								{isActive() && (
									<span
										className={clsx(
											"Nav_arrow",
											"!absolute",
											loading ? "-top-2.5" : "-top-0.5",
											"w-4 h-4",
											"bg-blue-400 z-50 transition-all duration-600"
										)}
									></span>
								)}
								<Link href={link.link} key={`Nav_${link.name}`}>
									<a className="px-8 py-4 z-50">
										{link.name}
									</a>
								</Link>
							</li>
						);
					})}
					<li
						className={clsx(
							"Nav_link Pulsable",
							"relative flex flex-col items-center"
						)}
					>
						<button
							className={clsx("p-4 z-50")}
							onClick={() => setMode((prev) => !prev)}
						>
							{mode ? <BsFillSunFill /> : <BsFillMoonFill />}
						</button>
					</li>
				</ul>
			</div>
		</nav>
	);
}
