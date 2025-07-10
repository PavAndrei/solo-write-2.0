import { SignInData } from '../utils/authSchemas';

type ApiResponse = {
  success: boolean;
  message?: string;
  statusCode?: number;
};

export const signUp = async (formData: FormData): Promise<ApiResponse> => {
  try {
    const response = await fetch(`http://localhost:5000/api/auth/signup`, {
      method: 'POST',
      body: formData as FormData,
    });

    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Unknown error',
    };
  }
};

export const signIn = async (
  formData: Omit<SignInData, 'repeatPassword' | 'terms' | 'file' | 'username'>
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`http://localhost:5000/api/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Unknown error',
    };
  }
};
