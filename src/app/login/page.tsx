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
import CrossIcon from "@/components/icons/cross-icon";
import Image from "next/image";
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

  const handleCrossBtn = () => {
    router.push(RoutesPaths.HOME);
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
      router.push(RoutesPaths.EVILMARTIANS);
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
    <div className="container absolute top-[37%] left-1/2 -translate-y-1/2 -translate-x-1/2 flex justify-center ">
      <div className="flex w-full max-w-[400px] bg-white rounded p-4 pb-8">
        <div className="flex flex-col w-full">
          <div className="flex mb-5 justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex w-14 h-14 justify-center items-center rounded-full border solid border-[#E7E7E7]">
                <LoginIcon />
              </div>
              <span className="text-2xl font-medium select-none">Sign in</span>
            </div>
            <CrossIcon onClick={handleCrossBtn} />
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
              <div className="relative">
                <Image
                  className="absolute left-5 top-1/2 -translate-y-1/2"
                  src="data:image/svg+xml,%3Csvg width='20' height='18' viewBox='0 0 20 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.9394 0C16.2804 0 17.5704 0.53 18.5194 1.481C19.4694 2.43 20.0004 3.71 20.0004 5.05V12.95C20.0004 15.74 17.7304 18 14.9394 18H5.06037C2.26937 18 0.000366211 15.74 0.000366211 12.95V5.05C0.000366211 2.26 2.25937 0 5.06037 0H14.9394ZM16.0704 5.2C15.8604 5.189 15.6604 5.26 15.5094 5.4L11.0004 9C10.4204 9.481 9.58937 9.481 9.00037 9L4.50037 5.4C4.18937 5.17 3.75937 5.2 3.50037 5.47C3.23037 5.74 3.20037 6.17 3.42937 6.47L3.56037 6.6L8.11037 10.15C8.67037 10.59 9.34937 10.83 10.0604 10.83C10.7694 10.83 11.4604 10.59 12.0194 10.15L16.5304 6.54L16.6104 6.46C16.8494 6.17 16.8494 5.75 16.5994 5.46C16.4604 5.311 16.2694 5.22 16.0704 5.2Z' fill='%23626262' /%3E%3C/svg%3E"
                  alt="email icon"
                  style={{ width: 18, height: 20 }}
                  width={20}
                  height={18}
                />
                <input
                  id="email"
                  autoComplete="username"
                  aria-required="true"
                  aria-describedby="email-error"
                  aria-invalid={errors.email ? "true" : "false"}
                  className={`${errors.email ? "border-red-500" : "border-[#E7E7E7]"} ${inputStyle}`}
                  type="email"
                  placeholder="Email"
                  value={email}
                  autoFocus
                  onChange={handleEmailChange}
                  onBlur={() => handleBlur("email")}
                />
              </div>
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
                <span className="text-[#FF0000]">*</span>
              </label>
              <div className="relative">
                <Image
                  style={{ width: 18, height: 20 }}
                  className="absolute left-5 top-1/2 -translate-y-1/2"
                  src="data:image/svg+xml,%3Csvg width='18' height='20' viewBox='0 0 18 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.98476 0C12.0535 0 14.5227 2.41479 14.5227 5.39601V6.92935C16.2451 7.46696 17.5 9.02614 17.5 10.8884V15.8253C17.5 18.1308 15.5886 20 13.2322 20H4.7688C2.41136 20 0.5 18.1308 0.5 15.8253V10.8884C0.5 9.02614 1.75595 7.46696 3.47729 6.92935V5.39601C3.48745 2.41479 5.95667 0 8.98476 0ZM8.99492 11.3843C8.50717 11.3843 8.11088 11.7718 8.11088 12.2488V14.4549C8.11088 14.9419 8.50717 15.3294 8.99492 15.3294C9.49283 15.3294 9.88912 14.9419 9.88912 14.4549V12.2488C9.88912 11.7718 9.49283 11.3843 8.99492 11.3843ZM9.00508 1.73904C6.94232 1.73904 5.26569 3.36878 5.25553 5.37613V6.7137H12.7445V5.39601C12.7445 3.37871 11.0678 1.73904 9.00508 1.73904Z' fill='%23626262' /%3E%3C/svg%3E"
                  alt="password icon"
                  width={20}
                  height={18}
                />
                <input
                  id="password"
                  className={`${errors.password ? "border-red-500" : "border-[#E7E7E7]"} ${inputStyle}`}
                  type="password"
                  aria-required="true"
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-describedby="password-error"
                  autoComplete="current-password"
                  placeholder="Password"
                  value={password}
                  onBlur={() => handleBlur("password")}
                  onChange={handlePasswordChange}
                />
              </div>
              <div
                className={`min-h-[40px] ${errorStyle}`}
                aria-errormessage="password-error"
              >
                {errors.password && errors.password}
              </div>
            </div>

            <button
              className={`py-2 h-12 text-white font-semibold ${
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
