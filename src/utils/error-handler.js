import { toast } from "react-toastify";

export function handleAppError(err) {
  if (!navigator.onLine)
    return toast.error(
      "Your internet is unavailable at the moment. Please try again later"
    );
  return toast.error("Something went wrong. Please try again later");
}
