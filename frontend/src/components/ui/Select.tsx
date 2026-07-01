import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string | boolean;
}

const Select = forwardRef<HTMLSelectElement, Props>(
  ({ children, className, error, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={twMerge(
          "text-[0.9rem] outline-none transition-colors border",
          className,
          error && "border-danger focus:border-danger",
        )}
        {...props}
      >
        {children}
      </select>
    );
  },
);

export default Select;
