import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useCallback, useEffect, useState } from "react";
import { NextRouter, useRouter } from "next/router";
import { Nav, PictureViewer } from "@/src/components";
import {
	defaultModal,
	ModalContext,
	ModalType,
	ModeContext,
	LoadingContext,
	ScrollContext,
	WidthContext,
} from "@/src/contexts";
import clsx from "clsx";

// https://codepen.io/BretCameron/pen/mdPMVaW
function createRipple(event: any) {
	const button = event.currentTarget,
		circle = document.createElement("span"),
		diameter = Math.max(button.clientWidth, button.clientHeight),
		radius = diameter / 2,
		left = event.clientX - button.offsetLeft - radius,
		top = event.clientY - button.offsetTop - radius;

	circle.style.width = circle.style.height = `${diameter}px`;
	circle.style.left = `${left}px`;
	circle.style.top = `${top}px`;
	circle.className = "ripple bg-gray-300 dark:bg-gray-600 z-40";

	const ripple = button.getElementsByClassName("ripple")[0];

	if (ripple) {
		ripple.remove();
	}

	button.appendChild(circle);
}

function MyApp({ Component, pageProps }: AppProps) {
	const [modal, setModal] = useState<ModalType>(defaultModal);
	const [scroll, setScroll] = useState<number>(0);
	const [width, setWidth] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);
	const [readExistingPreference, setReadExistingPreference] = useState(false);
	const stateMode = useState(false);
	const [init, setInit] = useState(false);
	const [mode, setMode] = stateMode;
	const router: NextRouter = useRouter();

	const loadingContextValue = {
			loading: loading,
		},
		widthContextValue = {
			width: width,
		},
		scrollContextValue = {
			scroll: scroll,
		},
		modalContextValue = {
			modal: modal,
			setModal: setModal,
		};

	const trackScroll = useCallback(() => {
		const appExt = document.querySelector("#App_ext");
		if (appExt) setScroll(appExt.scrollTop);
	}, []);

	const trackWidth = useCallback(() => {
		setWidth(window.innerWidth);
	}, []);

	const startLoading = useCallback(() => {
		setLoading(true);
	}, []);

	const stopLoading = useCallback(() => {
		setLoading(false);
	}, []);

	const getPreferredMode = useCallback(() => {
		const existing = localStorage.getItem("mode");

		if (existing) {
			setMode(JSON.parse(existing));
		}

		setReadExistingPreference(true);
	}, [setMode]);

	const setPreferredMode = useCallback(() => {
		localStorage.setItem("mode", JSON.stringify(mode));
	}, [mode]);

	useEffect(() => {
		if (readExistingPreference) setPreferredMode();
	}, [mode, setPreferredMode, readExistingPreference]);

	useEffect(() => {
		setTimeout(() => {
			const buttons: HTMLCollectionOf<any> =
				document.getElementsByClassName("Pulsable");

			for (let i = 0; i < buttons.length; i++) {
				const button: any = buttons.item(i);

				if (button) {
					button.removeEventListener("click", createRipple);
					button.addEventListener("click", createRipple);
				}
			}
		}, 100);
	}, [loading]);

	const handleEnableListeners = useCallback(() => {
		const appExt = document.querySelector("#App_ext");

		if (!appExt) return;

		appExt.removeEventListener("scroll", trackScroll);
		appExt.addEventListener("scroll", trackScroll);

		window.removeEventListener("resize", trackWidth);
		window.addEventListener("resize", trackWidth);

		router.events.on("routeChangeStart", startLoading);
		router.events.on("routeChangeComplete", stopLoading);
	}, [router.events, startLoading, stopLoading, trackScroll, trackWidth]);

	const handleDisableListeners = useCallback(() => {
		const appExt = document.querySelector("#App_ext");

		if (appExt) {
			appExt.removeEventListener("scroll", trackScroll);
		}
		window.removeEventListener("resize", trackWidth);

		router.events.off("routeChangeStart", startLoading);
		router.events.off("routeChangeComplete", stopLoading);
	}, [router.events, startLoading, stopLoading, trackScroll, trackWidth]);

	useEffect(() => {
		setInit(true);
		getPreferredMode();
		setTimeout(() => {
			handleEnableListeners();
		}, 200);
		return () => {
			handleDisableListeners();
		};
	}, [getPreferredMode, handleDisableListeners, handleEnableListeners]);

	return (
		<LoadingContext.Provider value={loadingContextValue}>
			<WidthContext.Provider value={widthContextValue}>
				<ScrollContext.Provider value={scrollContextValue}>
					<ModeContext.Provider value={mode}>
						<ModalContext.Provider value={modalContextValue}>
							<div
								className={clsx(
									"App_ext2",
									"overflow-hidden relative flex flex-col",
									mode ? "dark" : ""
								)}
								style={{ flex: "1 1 auto" }}
							>
								{/** @todo This is very scuffed. */}
								{/* <div
									className={clsx(
										"fixed w-screen h-screen",
										"top-0 left-0",
										"dark:bg-slate-900 bg-gray-100"
									)}
								></div> */}
								{init ? (
									<>
										<Nav
											scroll={scroll}
											loading={loading}
											stateMode={stateMode}
											setPreferredMode={setPreferredMode}
										/>
										<PictureViewer />
										<div
											id="App_ext"
											className={clsx(
												"App_ext h-exc-nav w-screen",
												"col-secondary overflow-y-scroll"
											)}
											// onScroll={() => trackScroll()}
										>
											<div
												id="App"
												className="App relative w-adaptive"
											>
												<Component {...pageProps} />
												<div className="relative col-text text-center p-8">
													© {new Date().getFullYear()}{" "}
													Jose Jovian
												</div>
											</div>
										</div>
									</>
								) : (
									<div className="" />
								)}
							</div>
						</ModalContext.Provider>
					</ModeContext.Provider>
				</ScrollContext.Provider>
			</WidthContext.Provider>
		</LoadingContext.Provider>
	);
}

export default MyApp;
