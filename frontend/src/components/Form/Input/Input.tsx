import { forwardRef, InputHTMLAttributes, useId } from "react";
import * as I from "./styled";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { type = "text", name = "", label = "", helperText = "", ...props },
    ref
  ) => {
    const inputId = useId();
    const hasError = helperText.length > 0;

    return (
      <I.Container>
        <I.Label htmlFor={inputId}>{label}</I.Label>
        <I.Input
          id={inputId}
          type={type}
          name={name}
          ref={ref}
          hasError={hasError}
          {...props}
        />
        {hasError && <I.HelperText>{helperText}</I.HelperText>}
      </I.Container>
    );
  }
);
