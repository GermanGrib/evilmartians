"use client";

import { useAuth } from "@/store/auth-context";
import { useRouter } from "next/navigation";
import RoutesPaths from "@/types/routes-paths";

const EvilMartiansPage = () => {
  const route = useRouter();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    route.push(RoutesPaths.LOGIN);
  }

  return (
    <section>
      <div className="container">
        Evil Martians & German Gribanov & Expected adventure...
      </div>
    </section>
  );
};

export default EvilMartiansPage;
