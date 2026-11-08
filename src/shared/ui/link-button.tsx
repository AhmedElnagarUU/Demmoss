import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";
import { buttonClasses, type ButtonVariant } from "./button-styles";

type Props = LinkProps & {
  variant?: ButtonVariant;
  className?: string;
  target?: string;
  rel?: string;
  children: ReactNode;
};

export function LinkButton({ variant, className = "", children, ...props }: Props) {
  return (
    <Link className={`${buttonClasses(variant)} ${className}`} {...props}>
      {children}
    </Link>
  );
}
