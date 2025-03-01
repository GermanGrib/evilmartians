"use client";
import { useAuth } from "@/store/auth-context";
import Image from "next/image";
import Loader from "@/components/loader";

export default function Home() {
  const { initialized, isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated && initialized && (
        <div className="flex flex-col gap-2 lg:gap-4">
          <div className="flex absolute select-none top-4 w-full justify-center flex-grow lg:text-lg text-center text-white">
            Logged in
          </div>
          <Image
            priority
            className="w-auto lg:w-full h-screen mx-auto"
            src={
              "https://cdn.svgator.com/images/2021/10/animated-background-space.svg"
            }
            width={200}
            height={200}
            alt="Space"
          />
        </div>
      )}
      <section>
        <div className="container flex flex-col justify-center">
          {!initialized && <Loader />}
          {!isAuthenticated && initialized && (
            <div className="flex flex-col gap-2 lg:gap-4">
              <div className="flex w-full select-none justify-center flex-grow text-xs lg:text-lg text-center">
                Log in to access the data.
              </div>
              <Image
                priority
                className="w-auto rounded-xl max-w-[700px] mx-auto"
                src={
                  "https://cdn.svgator.com/images/2023/03/stopwatch-svg-animation.svg"
                }
                width={200}
                height={200}
                alt="Space"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
