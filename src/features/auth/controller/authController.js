import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { appRoutes } from "../../../core/constants/routes";
import { validateLogin } from "../../../core/utils/validation";
import { adminCredentials, signIn } from "../services/authService";

export function useAuthController() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    email: adminCredentials.email,
    password: adminCredentials.password,
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateLogin(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSubmitError("");

    try {
      await signIn(form.email, form.password);
      navigate(location.state?.from || appRoutes.overview, { replace: true });
    } catch (error) {
      setSubmitError(error.message || "Unable to sign in with the provided admin account.");
      console.error("Unable to sign in:", error);
    }
  }

  return {
    adminCredentials,
    form,
    setForm,
    errors,
    submitError,
    handleSubmit,
  };
}
