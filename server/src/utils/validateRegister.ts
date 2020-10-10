import { FieldError } from "../types/FieldError";
import { UsernamePasswordInput } from "../types/UsernamePasswordInput";

export default (
  options: UsernamePasswordInput,
  isExist: Boolean
): [FieldError] | null => {
  if (isExist)
    return [
      {
        field: "username",
        message: "username exist",
      },
    ];

  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "email address is not valid",
      },
    ];
  }
  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "Username is too short",
      },
    ];
  }
  if (options.password.length <= 5) {
    return [
      {
        field: "password",
        message: "Password is too short",
      },
    ];
  }

  return null;
};
