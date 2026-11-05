import type { ButtonHTMLAttributes } from "react";
import { buttonClasses, type ButtonVariant } from "./button-styles";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant };

export function Button({ variant, className = "", type = "button", ...props }: Props) {
  return <button type={type} className={`${buttonClasses(variant)} ${className}`} {...props} />;
}
