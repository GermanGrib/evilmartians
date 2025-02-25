"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth-context";
import { getCookie } from "cookies-next";
import RoutesPaths from "@/types/routes-paths";
import {
  handleAuth,
  sanitizeInput,
  validateEmail,
  validatePassword,
} from "@/utils/form-tools";

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  useEffect(() => {
    if (getCookie("isAuthenticated") === "true") {
      router.push(RoutesPaths.HOME);
    }
  }, [router]);

  useEffect(() => {
    setErrors({
      email: validateEmail(email),
      password: validatePassword(password),
    });
  }, [email, password]);
  const isFormValid = email && password && !errors.email && !errors.password;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = sanitizeInput(e.target.value);
    setEmail(newEmail);
    setErrors((prev) => ({ ...prev, email: validateEmail(newEmail) }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = sanitizeInput(e.target.value);
    setPassword(newPassword);
    setErrors((prev) => ({ ...prev, password: validatePassword(newPassword) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAuth(email, password, login, router, setErrors);
  };

  const inputStyle =
    "px-2 py-1 w-full border solid border-em-outline rounded text-black";
  const errorStyle = "text-red-500 text-sm";
  const labelStyle = "block text-black";

  return (
    <div className="container flex justify-center">
      <div className="flex w-full bg-white rounded p-4">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col w-full gap-2"
        >
          <div>
            <label htmlFor="email" className={labelStyle}>
              Email
            </label>
            <input
              id="email"
              className={inputStyle}
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            <div className={`min-h-[20px] ${errorStyle}`}>
              {errors.email && errors.email}
            </div>
          </div>
          <div>
            <label htmlFor="password" className={labelStyle}>
              Password
            </label>
            <input
              id="password"
              className={inputStyle}
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <div className={`min-h-[60px] ${errorStyle}`}>
              {errors.password && errors.password}
            </div>
          </div>

          <button
            className={`py-2 ${
              isFormValid
                ? "bg-em-secondary hover:bg-em-secondary-hover"
                : "bg-em-secondary opacity-30"
            } rounded`}
            type="submit"
            disabled={!isFormValid}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
