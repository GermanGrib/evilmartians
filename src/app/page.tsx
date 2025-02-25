"use client";
import Image from "next/image";
import { useAuth } from "@/store/auth-context";
import RoutesPaths from "@/types/routes-paths";
import Link from "next/link";

export default function Home() {
  const { initialized, isAuthenticated } = useAuth();
  const isNotAuthenticated = !isAuthenticated;
  return (
    <section>
      <div className="container flex flex-col justify-center">
        {isAuthenticated && initialized && (
          <Image
            className="m-auto"
            width={300}
            height={300}
            src="/ring.png"
            alt="Ring"
          />
        )}
        {isNotAuthenticated && initialized && (
          <div className="flex flex-col gap-2 justify-center items-center">
            <Image
              priority
              className="rounded"
              src="/alien.webp"
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
