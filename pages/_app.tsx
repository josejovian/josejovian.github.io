import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { NextRouter, useRouter } from "next/router";
import { Nav, PictureViewer } from "@/src/components";
import {
  defaultModal,
  ModalType,
  ContextProviderWrapper,
} from "@/src/contexts";
import clsx from "clsx";
import { ContextValueObjectType } from "@/src/types";

// https://codepen.io/BretCameron/pen/mdPMVaW
function createRipple(event: MouseEvent) {
  const button = event.currentTarget as HTMLElement,
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
  setTimeout(() => {
    circle.remove();
  }, 1000);
}

function MyApp({ Component, pageProps }: AppProps) {
  const init = useRef(false);

  const [readExistingPreference, setReadExistingPreference] = useState(false);
  const stateMode = useState(false);
  const [mode, setMode] = stateMode;
  const [modal, setModal] = useState<ModalType>(defaultModal);
  const [scroll, setScroll] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const scrolls = useRef<Record<string, number>>({});
  const router: NextRouter = useRouter();

  const contextValues = useMemo<ContextValueObjectType>(
    () => ({
      loading: {
        loading,
      },
      modal: {
        modal,
        setModal,
      },
      mode,
      scroll: {
        scroll,
      },
      width: {
        width,
      },
    }),
    [loading, modal, mode, scroll, width]
  );

  const handleTrackScroll = useCallback(() => {
    const appExt = document.querySelector("#App_ext");
    if (appExt) {
      setScroll(appExt.scrollTop);
    }
  }, []);

  const handleTrackWidth = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);

  const handleRouteChangeStart = useCallback((nextRoute: string) => {
    const appExt = document.querySelector("#App_ext");
    const route = window.location.pathname;

    if (appExt && nextRoute !== route) {
      scrolls.current[route] = appExt.scrollTop;
    }

    setLoading(true);
  }, []);

  const handleRouteChangeComplete = useCallback((nextRoute: string) => {
    const appExt = document.querySelector("#App_ext");
    const route = window.location.pathname;

    setLoading(false);

    if (!appExt) return;

    if (!scrolls.current[route]) {
      appExt.scrollTop = 0;
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        appExt.scrollTop = scrolls.current[route];
        window.scrollTo(0, scrolls.current[route]);
      }, 100);
    }
  }, []);

  const handleGetPreferredMode = useCallback(() => {
    const existing = localStorage.getItem("mode");

    if (existing) {
      setMode(JSON.parse(existing));
    }

    setReadExistingPreference(true);
  }, [setMode]);

  const handleSetPreferredMode = useCallback(() => {
    localStorage.setItem("mode", JSON.stringify(mode));
  }, [mode]);

  useEffect(() => {
    if (readExistingPreference) handleSetPreferredMode();
  }, [mode, handleSetPreferredMode, readExistingPreference]);

  useEffect(() => {
    const buttons = document.querySelectorAll(".Nav_link");

    for (let i = 0; i < buttons.length; i++) {
      const button = buttons.item(i) as HTMLLIElement;

      if (button) {
        button.removeEventListener("click", createRipple);
        button.addEventListener("click", createRipple);
      }
    }
  }, [width, init, loading]);

  const handleEnableListeners = useCallback(() => {
    const appExt = document.querySelector("#App_ext");

    if (!appExt) return;

    appExt.addEventListener("scroll", handleTrackScroll);
    window.addEventListener("resize", handleTrackWidth);

    router.events.off("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
  }, [
    router.events,
    handleRouteChangeStart,
    handleRouteChangeComplete,
    handleTrackScroll,
    handleTrackWidth,
  ]);

  useEffect(() => {
    if (!init.current) {
      init.current = true;
      handleGetPreferredMode();
      setTimeout(() => {
        handleEnableListeners();
      }, 200);
    }
  }, [handleGetPreferredMode, handleEnableListeners]);

  useEffect(() => {
    setWidth(document.documentElement.offsetWidth);
  }, []);

  return (
    <ContextProviderWrapper values={contextValues}>
      <div
        className={clsx(
          "App_ext2",
          "overflow-hidden relative flex flex-col",
          mode ? "dark" : ""
        )}
        style={{ flex: "1 1 auto" }}
      >
        {init ? (
          <>
            <Nav
              width={width}
              scroll={scroll}
              loading={loading}
              stateMode={stateMode}
            />
            <PictureViewer />
            <div
              id="App_ext"
              className={clsx(
                "App_ext h-exc-nav w-screen",
                "col-secondary overflow-y-scroll"
              )}
            >
              <div id="App" className="App relative w-adaptive">
                <Component {...pageProps} />
                <div className="relative col-text text-center p-8">
                  © {new Date().getFullYear()} Jose Jovian
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="" />
        )}
      </div>
    </ContextProviderWrapper>
  );
}

export default MyApp;
