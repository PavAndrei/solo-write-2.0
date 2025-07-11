import { SignInData } from '../utils/authSchemas';

type UserData = {
  userId: string;
  email: string;
  role: string;
  verified: boolean;
};

export type ApiResponse = {
  success: boolean;
  message?: string;
  user?: UserData;
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
      credentials: 'include',
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

export const checkAuth = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/me', {
      credentials: 'include', // Важно для кук!
    });
    return await response.json();
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Auth check failed',
    };
  }
};

export const logout = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    return await response.json();
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Logout failed',
    };
  }
};
