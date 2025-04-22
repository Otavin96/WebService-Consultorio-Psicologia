import { ButtonHTMLAttributes, forwardRef } from "react";
import * as B from "./styled";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type = "submit", text, ...props }, ref) => {
    return (
      <B.Button ref={ref} type={type} {...props}>
        {text}
      </B.Button>
    );
  }
);

Button.displayName = "Button";
