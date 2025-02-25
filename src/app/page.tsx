"use client";
import Image from "next/image";
import { useAuth } from "@/store/auth-context";
import RoutesPaths from "@/types/routes-paths";
import Link from "next/link";
import ringPng from "@/assets/imgs/ring.png";
import alienWebp from "@/assets/imgs/alien.webp";

export default function Home() {
  const { initialized, isAuthenticated } = useAuth();
  const isNotAuthenticated = !isAuthenticated;
  return (
    <section>
      <div className="container flex flex-col justify-center">
        {!initialized && <div>Loading...</div>}
        {isAuthenticated && initialized && (
          <Image
            style={{ width: 400, height: 300 }}
            priority
            className="m-auto"
            width={400}
            height={300}
            src={ringPng}
            alt="Ring"
          />
        )}
        {isNotAuthenticated && initialized && (
          <div className="flex flex-col gap-2 justify-center items-center">
            <Image
              priority
              style={{ width: 400, height: 300 }}
              className="rounded"
              src={alienWebp}
              alt="Home"
              width={400}
              height={300}
            />
            <Link
              className="flex justify-center items-center m-auto p-2 w-full max-w-[400px] text-center select-none text-lg rounded border solid border-em-outline hover:border-white transition "
              href={RoutesPaths.LOGIN}
            >
              Login my precious
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
