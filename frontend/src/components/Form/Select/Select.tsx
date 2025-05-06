import { forwardRef, SelectHTMLAttributes, useId } from "react";
import * as S from "./styled";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  helperText?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label = "", helperText = "", ...props }) => {
    const SelectId = useId();
    const hasError = helperText.length > 0;

    return (
      <S.Container>
        <S.Label htmlFor={SelectId}>{label}</S.Label>
        <S.Select id={SelectId} {...props}></S.Select>
        {hasError && <S.HelperText>{helperText}</S.HelperText>}
      </S.Container>
    );
  }
);

Select.displayName = "Select";
