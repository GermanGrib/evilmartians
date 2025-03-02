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
import LoginIcon from "@/components/icons/login-icon";
import Loader from "@/components/loader";

const LoginPage = () => {
  const router = useRouter();
  const { login, initialized } = useAuth();
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
    "px-2 pl-14 h-12 py-1 w-full border solid border-em-outline rounded text-black text-lg bg-transparent focus:outline-em-tertiriary";
  const errorStyle = "text-red-500 text-sm";
  const labelStyle =
    "mb-2 block text-black md:text-xl select-none cursor-pointer";

  if (!initialized) {
    return <Loader />;
  }

  return (
    <div className="container absolute top-[45%] left-1/2 -translate-y-1/2 -translate-x-1/2 flex justify-center ">
      <div className="flex w-full max-w-[400px] bg-white rounded p-4 pb-8">
        <div className="flex flex-col w-full">
          <div className="flex mb-5 justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex w-14 h-14 justify-center items-center rounded-full border solid border-[#E7E7E7]">
                <LoginIcon />
              </div>
              <span className="text-2xl font-medium select-none">Sign in</span>
            </div>
          </div>
          <div className="mb-5 md:mb-10 md:text-xl text-[#626262] leading-snug select-none">
            Login to your account - enjoy exclusive features & many more
          </div>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col w-full gap-2"
          >
            <div>
              <label htmlFor="email" className={labelStyle}>
                Email
                <span className="text-[#FF0000]">*</span>
              </label>
              <div className="relative flex">
                <div className="email-input absolute w-5 h-5 top-1/2 -translate-y-1/2 translate-x-4" />
                <input
                  id="email"
                  autoComplete="username"
                  aria-required="true"
                  aria-live="polite"
                  aria-errormessage="email-error"
                  aria-invalid={errors.email ? "true" : "false"}
                  className={`${errors.email ? "border-red-500" : "border-[#E7E7E7]"} ${inputStyle}`}
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={() => handleBlur("email")}
                />
              </div>
              <div className={`min-h-[20px] ${errorStyle}`} id="email-error">
                {errors.email && errors.email}
              </div>
            </div>
            <div>
              <label htmlFor="password" className={labelStyle}>
                Password
                <span className="text-[#FF0000]">*</span>
              </label>
              <div className="relative flex">
                <div className="password-input absolute w-5 h-5 top-1/2 -translate-y-1/2 translate-x-4" />
                <input
                  id="password"
                  className={`${errors.password ? "border-red-500" : "border-[#E7E7E7]"} ${inputStyle}`}
                  type="password"
                  aria-required="true"
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-errormessage="password-error"
                  aria-live="polite"
                  autoComplete="current-password"
                  placeholder="Password"
                  value={password}
                  onBlur={() => handleBlur("password")}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className={`min-h-[40px] ${errorStyle}`} id="password-error">
                {errors.password && errors.password}
              </div>
            </div>

            <button
              className={`py-2 h-12 text-white font-semibold focus:shadow-2xl focus:outline-black  ${
                !isLoading
                  ? "bg-em-tertiriary hover:opacity-80"
                  : "bg-[#B6B6B6]"
              } rounded`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
