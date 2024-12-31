import React from "react";
import cx from "classnames";

type Props = {
  size: "sm" | "md" | "lg";
  color: "primary" | "secondary";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, className, ...props }: Props) => {
  return (
    <button
      onClick={props.onClick}
      className={cx(
        "px-2 py-1 font-bold rounded-md",
        {
          "bg-violet-700 text-white": props.color === "primary",
          "bg-violet-300 text-white": props.color === "secondary",
        },
        {
          "text-sm": props.size === "sm",
          "text-base": props.size === "md",
          "text-lg": props.size === "lg",
        },
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
