"use client";
import RoutesPaths from "@/types/routes-paths";
import Link from "next/link";
import HomeIcon from "@/components/icons/home-icon";
import { usePathname } from "next/navigation";
import LoginIconMobileMenu from "@/components/icons/login-icon-mobile-menu";
import { useAuth } from "@/store/auth-context";
import SpaceshipIcon from "@/components/icons/spaceship-icon";

const MobileMenu = () => {
  const pathName = usePathname();
  const { isAuthenticated, initialized } = useAuth();
  const isNotAuthenticated = !isAuthenticated;
  return (
    <div className="fixed lg:hidden pt-5 pb-2.5 px-12 w-full bottom-0 rounded-t-2xl bg-white">
      <div className="flex justify-between items-center">
        <Link
          href={RoutesPaths.HOME}
          className={`flex flex-col gap-1 items-center ${pathName === RoutesPaths.HOME ? "text-em-tertiriary" : "text-[#A0AAB6]"}`}
        >
          <HomeIcon className="h-9 w-9 " />
          <span
            className={`text-xs font-normal select-none ${
              pathName !== RoutesPaths.HOME ? "text-[#A0AAB6]" : " text-black"
            }`}
          >
            Home
          </span>
        </Link>
        {isNotAuthenticated && initialized && (
          <Link
            href={RoutesPaths.LOGIN}
            className={`flex flex-col gap-1 items-center ${pathName === RoutesPaths.LOGIN ? "text-em-tertiriary" : "text-[#dadee2]"}`}
          >
            <div
              className={`flex justify-center items-center p-1.5 h-9 w-9 ${pathName === RoutesPaths.LOGIN ? "bg-[#cbbbfc]" : "bg-[#9fa9b5]"} rounded-lg`}
            >
              <LoginIconMobileMenu />
            </div>
            <span
              className={`text-xs font-normal select-none ${
                pathName !== RoutesPaths.LOGIN
                  ? "text-[#A0AAB6]"
                  : " text-black"
              }`}
            >
              Login
            </span>
          </Link>
        )}
        {isAuthenticated && initialized && (
          <Link
            href={RoutesPaths.EVILMARTIANS}
            className={`flex flex-col gap-1 items-center ${pathName === RoutesPaths.EVILMARTIANS ? "text-em-tertiriary" : "text-[#dadee2]"}`}
          >
            <div
              className={`flex justify-center items-center p-1.5 h-9 w-9 ${pathName === RoutesPaths.EVILMARTIANS ? "bg-[#cbbbfc]" : "bg-[#9fa9b5]"} rounded-lg`}
            >
              <SpaceshipIcon />
            </div>
            <span
              className={`text-xs font-normal select-none ${
                pathName !== RoutesPaths.EVILMARTIANS
                  ? "text-[#A0AAB6]"
                  : " text-black"
              }`}
            >
              Martians
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
