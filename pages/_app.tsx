import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Nav } from "@/src/components/Generic/Nav/Nav";
import {
	defaultModal,
	ModalContext,
	ModalType,
} from "@/src/contexts/ModalContext";
import PictureViewer from "@/src/components/Generic/PictureViewer/PictureViewer";
import { useCallback, useEffect, useState } from "react";
import { WidthContext } from "@/src/contexts/WidthContext";
import { NextRouter, useRouter } from "next/router";
import { ScrollContext } from "@/src/contexts/ScrollContext";
import { LoadingContext } from "@/src/contexts/LoadingContext";
import { ModeContext } from "@/src/contexts/ModeContext";

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
		const doc: HTMLElement = document.documentElement;
		setScroll(doc.scrollTop);
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
		console.log("Existing: ", existing);
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

	useEffect(() => {
		window.removeEventListener("scroll", trackScroll);
		window.addEventListener("scroll", trackScroll, { passive: true });
		window.removeEventListener("resize", trackWidth);
		window.addEventListener("resize", trackWidth);
		router.events.on("routeChangeStart", startLoading);
		router.events.on("routeChangeComplete", stopLoading);
		getPreferredMode();

		return () => {
			window.removeEventListener("scroll", trackScroll);
			window.removeEventListener("resize", trackWidth);
			router.events.off("routeChangeStart", startLoading);
			router.events.off("routeChangeComplete", stopLoading);
		};
	}, [
		router.events,
		getPreferredMode,
		startLoading,
		stopLoading,
		trackScroll,
		trackWidth,
	]);

	return (
		<LoadingContext.Provider value={loadingContextValue}>
			<WidthContext.Provider value={widthContextValue}>
				<ScrollContext.Provider value={scrollContextValue}>
					<ModeContext.Provider value={mode}>
						<ModalContext.Provider value={modalContextValue}>
							<div className={mode ? "dark" : ""}>
								<PictureViewer />
								<Nav
									scroll={scroll}
									loading={loading}
									stateMode={stateMode}
									setPreferredMode={setPreferredMode}
								/>
								<div className="relative top-16 p-adaptive col-secondary">
									<Component {...pageProps} />
									<div className="relative text-center p-8">
										© {new Date().getFullYear()} Jose Jovian
									</div>
								</div>
							</div>
						</ModalContext.Provider>
					</ModeContext.Provider>
				</ScrollContext.Provider>
			</WidthContext.Provider>
		</LoadingContext.Provider>
	);
}

export default MyApp;
