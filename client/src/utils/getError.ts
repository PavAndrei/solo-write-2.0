import { FieldErrors } from 'react-hook-form';
import { SignInData, SignUpData } from './authSchemas';

const getError = (
  type: 'sign-in' | 'sign-up',
  field: keyof SignUpData | keyof SignInData
): string | undefined => {
  if (type === 'sign-up') {
    return (errors as FieldErrors<SignUpData>)[field as keyof SignUpData]?.message as
      | string
      | undefined;
  }
  return (errors as FieldErrors<SignInData>)[field as keyof SignInData]?.message as
    | string
    | undefined;
};
