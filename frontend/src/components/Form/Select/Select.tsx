import { forwardRef, SelectHTMLAttributes, useId } from "react";
import * as S from "./styled";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label = "", ...props }) => {
    const SelectId = useId();

    return (
      <S.Container>
        <S.Label htmlFor={SelectId}>{label}</S.Label>
        <S.Select id={SelectId} {...props}></S.Select>
      </S.Container>
    );
  }
);

Select.displayName = "Select";
