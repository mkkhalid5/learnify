"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { ReactNode } from "react";

type AppButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "outline"
    | "ghost"
    | "danger";
  isDisabled?: boolean;
  className?: string;
};

const AppButton = ({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  isDisabled = false,
  className = "",
}: AppButtonProps) => {
  if (href) {
    return (
      <Link href={href}>
        <Button variant={variant} className={className}>
          {children}
        </Button>
      </Link>
    );
  }

  return (
    <Button
      type={type}
      variant={variant}
      onPress={onClick}
      isDisabled={isDisabled}
      className={className}
    >
      {children}
    </Button>
  );
};

export default AppButton;