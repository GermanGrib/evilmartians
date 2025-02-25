"use client";
import { useAuth } from "@/store/auth-context";
import Link from "next/link";
import RoutesPaths from "@/types/routes-paths";
import { usePathname } from "next/navigation";
import Logo from "@/components/logo";

const Header = () => {
  const { isAuthenticated, initialized, logout } = useAuth();
  const pathName = usePathname() || "";

  return (
    <header className="mb-2 py-4">
      <div className="container flex justify-between items-center">
        <Logo className="w-16 h-16 lg:hover:text-em-main-hover" />
        <nav>
          <ul className="flex gap-4">
            <li>
              {initialized && (
                <Link
                  className={`hidden lg:flex lg:hover:text-em-main-hover ${pathName === RoutesPaths.HOME ? "underline" : ""}`}
                  href={RoutesPaths.HOME}
                >
                  Home
                </Link>
              )}
            </li>
            <li className="flex gap-4">
              {isAuthenticated && initialized && (
                <Link
                  href={RoutesPaths.EVILMARTINAS}
                  className={`lg:hover:text-em-main-hover ${pathName === RoutesPaths.EVILMARTINAS ? "underline" : ""}`}
                >
                  Martinas
                </Link>
              )}
              {!isAuthenticated && initialized && (
                <Link
                  className={`lg:hover:text-em-main-hover ${pathName === RoutesPaths.LOGIN ? "hidden" : "flex"}`}
                  href={RoutesPaths.LOGIN}
                >
                  Login
                </Link>
              )}
            </li>
            {isAuthenticated && initialized && (
              <li onClick={logout}>
                <Link
                  className={`lg:hover:text-em-main-hover`}
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
