"use client";
import { useAuth } from "@/store/auth-context";
import Link from "next/link";
import RoutesPaths from "@/types/routes-paths";
import { usePathname } from "next/navigation";
import Logo from "@/components/logo";

const Header = () => {
  const { isAuthenticated, initialized, logout } = useAuth();
  const pathName = usePathname() || "";

  const linkCommonStyle =
    "px-5 py-4 rounded-xl ring-1 ring-[#E6E6E6] transition  justify-center items-center lg:hover:bg-[#b097f9] lg:hover:text-white";

  return (
    <header className="py-2 fixed lg:static bg-white lg:bg-transparent w-full z-50">
      <div className="container flex justify-between items-center">
        <Logo className="w-12 h-12 lg:w-16 lg:h-16 lg:hover:text-em-tertiriary" />
        <nav>
          <ul className="flex gap-4">
            <li>
              {initialized && (
                <Link
                  className={`hidden lg:flex ${linkCommonStyle} ${pathName === RoutesPaths.HOME ? "bg-em-tertiriary text-white" : ""}`}
                  href={RoutesPaths.HOME}
                >
                  Home
                </Link>
              )}
            </li>
            <li>
              {isAuthenticated && initialized && (
                <Link
                  href={RoutesPaths.EVILMARTIANS}
                  className={`hidden lg:flex ${linkCommonStyle} ${pathName === RoutesPaths.EVILMARTIANS ? "bg-em-tertiriary text-white" : ""}`}
                >
                  Martinas
                </Link>
              )}
              {!isAuthenticated && initialized && (
                <Link
                  className={`hidden lg:flex ${linkCommonStyle} ${pathName === RoutesPaths.LOGIN ? "bg-em-tertiriary text-white" : ""}`}
                  href={RoutesPaths.LOGIN}
                >
                  Login
                </Link>
              )}
            </li>
            {isAuthenticated && initialized && (
              <li onClick={logout}>
                <Link
                  className={`${linkCommonStyle} flex text-sm lg:text-base`}
                  href={RoutesPaths.HOME}
                >
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
