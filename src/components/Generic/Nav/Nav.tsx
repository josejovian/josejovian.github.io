import { useEffect, useState, useMemo } from "react";
import clsx from "clsx";
import { BsList } from "react-icons/bs";
import { NavLinks, NavLogo } from "@/src/components";
import { LinkType, StateModeType } from "@/src/types";

export interface NavProps {
  width: number;
  scroll: number;
  loading: boolean;
  stateMode: StateModeType;
  setPreferredMode?: (mode: boolean) => void;
}

export function Nav({ width, scroll, loading, stateMode }: NavProps) {
  const [mobileHidden, setMobileHidden] = useState(false);

  const links: LinkType[] = useMemo(
    () => [
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
    ],
    []
  );

  useEffect(() => {
    if (!loading) setMobileHidden(false);
  }, [loading, width]);

  const renderNavBorder = useMemo(
    () => (
      <div
        className={clsx("h-1 bg-blue-400 z-50", "transition-all delay-300")}
      />
    ),
    []
  );

  const renderNavLogo = useMemo(
    () => <NavLogo hidden={mobileHidden} />,
    [mobileHidden]
  );

  const renderNavLinks = useMemo(
    () => (
      <NavLinks
        links={links}
        loading={loading}
        mobileHidden={mobileHidden}
        stateMode={stateMode}
      />
    ),
    [links, loading, mobileHidden, stateMode]
  );

  const renderNavMobileToggle = useMemo(
    () => (
      <div
        className={clsx(
          "Nav_link relative flex sm:hidden",
          "flex-col items-center my-auto"
        )}
      >
        <button
          aria-label="Toggle Nav Menu"
          className={clsx("py-4 z-50 flex px-6 sm:px-8")}
          onClick={() => setMobileHidden((prev) => !prev)}
        >
          <BsList />
        </button>
      </div>
    ),
    []
  );

  const renderNav = useMemo(
    () => (
      <div
        className={clsx(
          "flex flex-row items-between justify-between",
          "w-adaptive m-auto"
        )}
      >
        {renderNavLogo}
        {renderNavLinks}
        {renderNavMobileToggle}
      </div>
    ),
    [renderNavLinks, renderNavLogo, renderNavMobileToggle]
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
      {renderNavBorder}
      {renderNav}
    </nav>
  );
}
