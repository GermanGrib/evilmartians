"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import RoutesPaths from "@/types/routes-paths";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(RoutesPaths.HOME);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <div className="container">
        <div>Страница не найдена. Перенаправляю на домашнюю страницу...</div>
      </div>
    </section>
  );
};
export default NotFound;
