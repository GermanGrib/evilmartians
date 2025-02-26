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
import AuthStatus from "@/types/auth-statuses";

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const [isLoading, setIsLoading] = useState(false);
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
      email: touched.email ? validateEmail(email) : "",
      password: touched.password ? validatePassword(password) : "",
    });
  }, [email, password, touched]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = sanitizeInput(e.target.value);
    setEmail(newEmail);
    setTouched((prev) => ({ ...prev, email: false }));
    setErrors({ email: "" });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = sanitizeInput(e.target.value);
    setTouched((prev) => ({ ...prev, password: false }));
    setPassword(newPassword);
  };

  const handleBlur = (field: "email" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    setIsLoading(true);
    const result = await handleAuth(email, password, login, setErrors);
    setIsLoading(false);

    if (result === AuthStatus.SUCCESS) {
      router.push(RoutesPaths.HOME);
    }
  };

  const inputStyle =
    "px-2 py-1 w-full border solid border-em-outline rounded text-black";
  const errorStyle = "text-red-500 text-sm";
  const labelStyle = "block text-black";

  return (
    <div className="container flex justify-center">
      <div className="flex w-full max-w-[400px] bg-white rounded p-4">
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
              autoComplete="username"
              aria-required="true"
              aria-describedby="email-error"
              className={inputStyle}
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => handleBlur("email")}
            />
            <div
              className={`min-h-[20px] ${errorStyle}`}
              aria-errormessage="email-error"
            >
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
              aria-required="true"
              aria-describedby="password-error"
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onBlur={() => handleBlur("password")}
              onChange={handlePasswordChange}
            />
            <div
              className={`min-h-[60px] ${errorStyle}`}
              aria-errormessage="password-error"
            >
              {errors.password && errors.password}
            </div>
          </div>

          <button
            className={`py-2 ${
              !isLoading
                ? "bg-em-secondary hover:bg-em-secondary-hover"
                : "bg-em-secondary opacity-30"
            } rounded`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
