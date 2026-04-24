import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string | boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={twMerge(
          "text-[0.9rem] outline-none transition-colors resize-none",
          className,
          error && "border-danger focus:border-danger",
        )}
        {...props}
      />
    );
  },
);

export default Textarea;
