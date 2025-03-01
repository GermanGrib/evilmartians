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
    "hidden px-5 py-4 rounded-xl ring-1 ring-[#E6E6E6] transition lg:flex justify-center items-center lg:hover:bg-[#b097f9] lg:hover:text-white";

  return (
    <header className="py-2">
      <div className="container flex justify-between items-center">
        <Logo className="w-12 h-12 lg:w-16 lg:h-16 lg:hover:text-em-tertiriary" />
        <nav>
          <ul className="flex gap-4">
            <li>
              {initialized && (
                <Link
                  className={`${linkCommonStyle} ${pathName === RoutesPaths.HOME ? "bg-em-tertiriary text-white" : ""}`}
                  href={RoutesPaths.HOME}
                >
                  Home
                </Link>
              )}
            </li>
            <li className="flex gap-4">
              {isAuthenticated && initialized && (
                <Link
                  href={RoutesPaths.EVILMARTIANS}
                  className={`${linkCommonStyle} ${pathName === RoutesPaths.EVILMARTIANS ? "bg-em-tertiriary text-white" : ""}`}
                >
                  Martinas
                </Link>
              )}
              {!isAuthenticated && initialized && (
                <Link
                  className={`${linkCommonStyle} ${pathName === RoutesPaths.LOGIN ? "bg-em-tertiriary text-white" : ""}`}
                  href={RoutesPaths.LOGIN}
                >
                  Login
                </Link>
              )}
            </li>
            {isAuthenticated && initialized && (
              <li onClick={logout}>
                <Link
                  className={`${linkCommonStyle} text-sm lg:text-base`}
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
