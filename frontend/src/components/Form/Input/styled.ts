import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label``;

export const Input = styled.input<{ hasError?: boolean }>`
  height: 30px;

  ${({ hasError }) =>
    hasError &&
    css`
      outline: 2px solid rgba(218, 28, 28, 0.81);
    `}
`;

export const HelperText = styled.p`
  padding-top: 3px;
`;
