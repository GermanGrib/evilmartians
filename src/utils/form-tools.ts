import AuthStatus from "@/types/auth-statuses";
import { setCookie } from "cookies-next";

const MOCK_LOGIN_ACC = {
  email: "evil@martians.com",
  password: "Qwer1!",
};
const ONE_DAY = 60 * 60 * 24;

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

const authUser = (email: string, password: string) => {
  return email !== MOCK_LOGIN_ACC.email || password !== MOCK_LOGIN_ACC.password
    ? AuthStatus.UNAUTHORIZED
    : AuthStatus.SUCCESS;
};

const handleAuth = (
  email: string,
  password: string,
  login: () => void,
  router: any,
  setErrors: (errors: { email?: string; password?: string }) => void,
) => {
  const response = authUser(email, password);
  const mockFetchAuthResponse = { success: true, token: "mock-token" };

  if (response !== AuthStatus.SUCCESS) {
    setErrors({ password: "The email and password combination is incorrect." });
    return AuthStatus.UNAUTHORIZED;
  }

  setCookie("isAuthenticated", "true", { path: "/", maxAge: ONE_DAY });
  setCookie("token", mockFetchAuthResponse.token, {
    path: "/",
    maxAge: ONE_DAY,
  });

  login();
  router.push("/");
  return AuthStatus.SUCCESS;
};

const sanitizeInput = (input: string) => {
  return input.replace(/<[^>]*>?/gm, "");
};

export { validateEmail, validatePassword, authUser, handleAuth, sanitizeInput };
