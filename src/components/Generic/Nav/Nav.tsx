import Link from "next/link";
import clsx from "clsx";
import { useEffect, useState, useMemo } from "react";
import { NextRouter, useRouter } from "next/router";
import NavImage from "./NavImage.svg";
import { BsFillMoonFill, BsFillSunFill, BsList } from "react-icons/bs";
import { StateModeType } from "@/src/types/Mode";

interface LinkType {
	name: string;
	link: string;
	hidden?: boolean;
}

const links: LinkType[] = [
	{
		name: "me",
		link: "/",
	},
	{
		name: "blog",
		link: "/blogs",
		hidden: true,
	},
	{
		name: "projects",
		link: "/projects",
	},
];

export interface NavProps {
	width: number;
	scroll: number;
	loading: boolean;
	stateMode: StateModeType;
	setPreferredMode?: (mode: boolean) => void;
}

export function Nav({ width, scroll, loading, stateMode }: NavProps) {
	const [mobileHidden, setMobileHidden] = useState(false);
	const [mode, setMode] = stateMode;

	const router: NextRouter = useRouter();

	useEffect(() => {
		if (!loading) setMobileHidden(false);
	}, [loading, width]);

	const navMainLinksResponsiveStyle = useMemo(
		() => clsx("hidden sm:flex", mobileHidden && "!flex"),
		[mobileHidden]
	);

	const navLogoResponsiveStyle = useMemo(
		() => clsx("flex", mobileHidden && "!hidden"),
		[mobileHidden]
	);

	return (
		<nav
			id="Nav"
			className={clsx(
				"w-screen h-16",
				"flex flex-col",
				"secondary border-b col-text",
				"z-50 overflow-hidden transition-shadow",
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
					"w-adaptive m-auto"
				)}
			>
				<div
					className={clsx(
						"flex items-center justify-center",
						navLogoResponsiveStyle
					)}
				>
					<Link href="/">
						<div className={clsx("NavImage", "bg-blue-400")}>
							<svg width="108" height="28">
								<defs>
									<clipPath id="Nav_logo-clip">
										<NavImage id="Nav_logo" />
									</clipPath>
								</defs>
							</svg>
						</div>
					</Link>
				</div>
				<ul className="flex items-center justify-center border-0 h-full">
					{links
						.filter((x) => !x.hidden)
						.map((link: LinkType) => {
							const active = (() => {
								if (
									router.pathname.includes("project") &&
									link.link.includes("project")
								)
									return true;

								if (
									router.pathname.includes("blog") &&
									link.link.includes("blog")
								)
									return true;
								return router.pathname === link.link;
							})();

							return (
								<li
									className={clsx(
										"Nav_link",
										"relative flex flex-col items-center",
										navMainLinksResponsiveStyle
									)}
									key={`Nav_${link.name}`}
								>
									{active && (
										<span
											className={clsx(
												"Nav_arrow",
												"!absolute",
												loading
													? "-top-2.5"
													: "-top-0.5",
												"w-4 h-4",
												"bg-blue-400 z-50 transition-all duration-600"
											)}
										></span>
									)}
									<Link
										href={link.link}
										key={`Nav_${link.name}`}
										className={clsx(
											"px-8 py-4 z-50",
											active && "text-blue-400"
										)}
									>
										{link.name}
									</Link>
								</li>
							);
						})}
					<li
						className={clsx(
							"Nav_link",
							"relative flex flex-col items-center",
							navMainLinksResponsiveStyle
						)}
					>
						<button
							className={clsx("py-4 z-50 px-4 sm:px-8")}
							onClick={() => setMode((prev) => !prev)}
						>
							{mode ? <BsFillSunFill /> : <BsFillMoonFill />}
						</button>
					</li>
				</ul>
				<div
					className={clsx(
						"Nav_link relative flex sm:hidden",
						"flex-col items-center my-auto"
					)}
				>
					<button
						className={clsx("py-4 z-50 flex px-6 sm:px-8")}
						onClick={() => setMobileHidden((prev) => !prev)}
					>
						<BsList />
					</button>
				</div>
			</div>
		</nav>
	);
}
