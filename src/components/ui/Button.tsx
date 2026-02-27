import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-transparent text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-[var(--ring)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-accent text-bg hover:opacity-90",
        secondary: "bg-panel text-fg border-border hover:bg-panel/80",
        ghost: "bg-transparent text-fg hover:bg-panel",
        destructive: "bg-[var(--danger)] text-white hover:opacity-90",
        link: "h-auto rounded-none border-0 bg-transparent px-0 text-accent underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 rounded-sm",
        md: "h-10 px-4 rounded-md",
        lg: "h-11 px-6 rounded-lg",
        icon: "h-10 w-10 p-0 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
    compoundVariants: [
      {
        variant: "link",
        size: "sm",
        className: "h-auto px-0",
      },
      {
        variant: "link",
        size: "md",
        className: "h-auto px-0",
      },
      {
        variant: "link",
        size: "lg",
        className: "h-auto px-0",
      },
      {
        variant: "link",
        size: "icon",
        className: "h-auto w-auto p-0",
      },
    ],
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => {
    return (
      <button
        type={type}
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
