import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react"; // ✅

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
};

const styles = {
  default: "bg-[#725BFF] text-white hover:bg-[#5a45e0]",
  outline: "border border-gray-300 hover:bg-gray-100",
  ghost: "text-gray-500 hover:text-black",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`px-4 py-2 rounded-lg transition font-medium ${styles[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
