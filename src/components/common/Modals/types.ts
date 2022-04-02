export type ValidationType = {
  isLengthOver: boolean;
  isDuplicated?: boolean;
  isSpecialChar?: boolean;
};

export type ErrorTextType = {
  lengthErrorText?: string;
  specialCharErrorText?: string;
  duplicatedErrorText?: string;
};
