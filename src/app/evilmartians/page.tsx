"use client";

import { useAuth } from "@/store/auth-context";
import { useRouter } from "next/navigation";
import RoutesPaths from "@/types/routes-paths";
import Image from "next/image";
import { useEffect } from "react";
import Loader from "@/components/loader";

const EvilMartiansPage = () => {
  const router = useRouter();
  const { isAuthenticated, initialized } = useAuth();

  useEffect(() => {
    if (initialized && !isAuthenticated) {
      router.push(RoutesPaths.LOGIN);
    }
  }, [isAuthenticated, initialized, router]);

  if (!initialized) {
    return <Loader />;
  }

  return (
    <section>
      <div className="container flex flex-col gap-2 lg:gap-4">
        <span className="flex w-full justify-center flex-grow text-xs lg:text-lg text-center">
          Evil Martians & German Gribanov <br /> &quot;The Desolation of
          time&quot;
        </span>
        <Image
          priority
          className="w-auto lg:w-full h-full rounded-lg mx-auto"
          width={300}
          height={300}
          alt="Space animation"
          src="https://cdn.svgator.com/images/2021/10/solar-system-animation.svg"
        />
      </div>
    </section>
  );
};

export default EvilMartiansPage;
