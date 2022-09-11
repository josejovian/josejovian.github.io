import Link from "next/link";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { NextRouter, useRouter } from "next/router";
import NavImage from "./NavImage.svg";

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
}

/*
	Button Ripple Effect:
	https://codepen.io/BretCameron/pen/mdPMVaW
*/

function createRipple(event: any) {
	const button = event.currentTarget;

	const circle = document.createElement("span");
	const diameter = Math.max(button.clientWidth, button.clientHeight);
	const radius = diameter / 2;

	circle.style.width = circle.style.height = `${diameter}px`;
	circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
	circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
	circle.classList.add("ripple");
	circle.classList.add("bg-gray-600");
	circle.classList.add("z-40");

	const ripple = button.getElementsByClassName("ripple")[0];

	if (ripple) {
		ripple.remove();
	}

	button.appendChild(circle);
}

const PathOfSVG = ({ svg } : any) => {
	return svg.firstChild;
};

export function Nav({ scroll, loading }: NavProps) {
	const router: NextRouter = useRouter();

	function transformLogo() {
		const logoSvg = document.getElementById("Nav_logo");
		const clip = document.getElementById("Nav_logo-clip");

		if (!logoSvg || !clip) return;

		const path = logoSvg.firstChild;

		if (path) {
			logoSvg.remove();
			clip.appendChild(path);
		}
	}

	useEffect(() => {
		// transformLogo();
	}, []);

	return (
		<nav
			id="Nav"
			className={clsx(
				"w-screen h-16",
				"fixed flex flex-col top-0",
				"bg-gray-800 border-0 z-50 overflow-hidden",
				scroll > 0 && "shadow-lg"
			)}
		>
			<div
				className={clsx(
					"h-1 bg-blue-400 z-50 transition-all delay-300",
				)}
			/>
			<div className="flex flex-row items-between justify-between w-full p-adaptive">
				<div className="flex items-center justify-center">
					<Link href="/" passHref>
						<a>
							<div
								className={clsx(
									"NavImage",
									"bg-blue-400"
								)}
							>
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
				</ul>
			</div>
		</nav>
	);
}
