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

const handleAuth = async (
  email: string,
  password: string,
  login: () => void,
  setErrors: (errors: { email?: string; password?: string }) => void,
) => {
  try {
    const mockFetchAuthResponse = await new Promise<{
      success: boolean;
      token: string;
    }>((resolve, reject) => {
      setTimeout(() => {
        const response = authUser(email, password);
        if (response !== AuthStatus.SUCCESS) {
          reject("The email and password combination is incorrect.");
        } else {
          resolve({ success: true, token: "mock-token" });
        }
      }, 2000);
    });

    setCookie("isAuthenticated", "true", { path: "/", maxAge: ONE_DAY });
    setCookie("token", mockFetchAuthResponse.token, {
      path: "/",
      maxAge: ONE_DAY,
    });

    login();
    return AuthStatus.SUCCESS;
  } catch (error) {
    console.error("Auth error:", error);
    setErrors({
      password: "The email and password combination is incorrect.",
    });
    return AuthStatus.ERROR;
  }
};

const sanitizeInput = (input: string) => {
  return input.replace(/<[^>]*>?/gm, "");
};

export { validateEmail, validatePassword, authUser, handleAuth, sanitizeInput };
