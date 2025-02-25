"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth-context";
import { getCookie, setCookie } from "cookies-next";
import RoutesPaths from "@/types/routes-paths";

// const handleLogin = (e: FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
// };
const LoginPage = () => {
  const ONE_DAY = 60 * 60 * 24;
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

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\W).+$/;
    if (!password) {
      return "Password is required";
    } else if (password.length < 6) {
      return "Password must be at least 6 characters long";
    } else if (!passwordRegex.test(password)) {
      return "Password must contain at least one uppercase letter and one special character";
    }
    return "";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setErrors((prev) => ({ ...prev, email: validateEmail(newEmail) }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setErrors((prev) => ({ ...prev, password: validatePassword(newPassword) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    if (!emailError && !passwordError) {
      const mockFetchAuthResponse = { success: true, token: "mock-token" };

      if (mockFetchAuthResponse.success) {
        setCookie("isAuthenticated", "true", { path: "/", maxAge: ONE_DAY });
        setCookie("token", mockFetchAuthResponse.token, {
          path: "/",
          maxAge: ONE_DAY,
        });

        login();
        router.push(RoutesPaths.HOME);
      }
    } else {
      setErrors({
        email: emailError,
        password: passwordError,
      });
    }
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
