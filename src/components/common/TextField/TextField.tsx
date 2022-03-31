import React from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../theme/styleTheme';
import { ValidationType, ErrorTextType } from '../Modals/types';

type TextFieldProps = {
  isError?: ValidationType;
  errorText?: ErrorTextType;
  hintText?: string;
  label?: string;
  onChange?: (arg: any) => void;
};

type StyleProps = {
  isError?: boolean;
};

const TextField = ({ isError, errorText, hintText, label, onChange }: TextFieldProps) => {
  const handleOnChange = (e: any) => {
    if (!onChange) return;
    onChange(e);
  };

  const showLabelText = () => {
    if (isError?.isDuplicated) {
      return <ErrorText>{errorText?.duplicatedErrorText}</ErrorText>;
    } else if (isError?.isLengthOver) {
      return <ErrorText>{errorText?.lengthErrorText}</ErrorText>;
    } else if (isError?.isSpecialChar) {
      return <ErrorText>{errorText?.specialCharErrorText}</ErrorText>;
    } else {
      return <LabelText>{label}</LabelText>;
    }
  };

  return (
    <InputWrapper>
      {showLabelText()}
      <Input
        isError={isError?.isDuplicated || isError?.isLengthOver || isError?.isSpecialChar}
        placeholder={hintText}
        onChange={e => handleOnChange(e.target.value)}
      />
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
`;

const Input = styled.input<StyleProps>`
  box-sizing: border-box;
  width: 100%;
  height: 48px;
  border: 5px solid ${themedPalette.input_normal};
  border-radius: 12px;
  font-size: 18px;
  padding: 0 10px 0 10px;
  transition: 0.3s ease-in-out;
  background-color: transparent;
  color: ${themedPalette.main_text1};

  :focus {
    outline: none !important;
    border: 5px solid ${themedPalette.input_focus};
    ${props => props.isError && `border: 5px solid ${themedPalette.input_error}`};
  }

  ${props => props.isError && `border: 5px solid ${themedPalette.red}`};
`;

const ErrorText = styled.span`
  color: ${themedPalette.red};
  font-size: 14px;
  padding: 0 0 8px 8px;
`;

const LabelText = styled.span`
  color: ${themedPalette.main_text1};
  font-size: 14px;
  padding: 0 0 8px 8px;
`;

export { TextField };
