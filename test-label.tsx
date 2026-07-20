import type * as React from "react";

export function Label({
  className,
  children,
  htmlFor,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label htmlFor={htmlFor} className={className} {...props}>
      {children}
    </label>
  );
}
