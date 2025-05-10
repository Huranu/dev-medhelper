import React from "react";

interface ButtonProps {
  variant?: "default" | "submit" | "cancel";
  size?: "small" | "medium" | "large";
  className?: string;
  children?: React.ReactNode;
  handler?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "small",
  className,
  children,
  handler,
  disabled = false,
}) => {
  let style =
    "gap-2 inline-flex items-center justify-center rounded-md px-2 py-1 whitespace-nowrap text-sm font-medium ring-offset-background transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const sizeStyles: Record<string, string> = {
    small: "text-xs px-1 py-0.5",
    medium: "text-sm px-2 py-1",
    large: "text-lg px-3 py-2",
  };

  style = `${style} ${sizeStyles[size] || sizeStyles.medium}`;

  switch (variant) {
    case "default":
      style +=
        " transition border border-input bg-white hover:bg-accent hover:border-black hover:text-accent-foreground focus:outline focus:outline-zinc-400 hover:transition-all focus:outline-2 focus:outline-offset-2";
      break;
    case "submit":
      style +=
        " transition border border-input border-gray-800 bg-gray-800 hover:border-black hover:bg-white hover:text-black hover:transition-all text-white ";
      break;
    case "cancel":
      style +=
        " transition border border-input border-red-500 bg-red-500 hover:border-red-500 hover:bg-white hover:text-red-500 hover:transition-all text-white";
      break;
    default:
      break;
  }

  style += className ? ` ${className}` : "";

  return (
    <button className={style} onClick={handler} disabled={disabled}>
      {children || "Button"}
    </button>
  );
};

export default Button;