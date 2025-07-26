import { BASE_API_URL } from '../constants/paths';
import { ApiAuthResponse } from '../types/apiTypes';
import { SignInData } from '../utils/authSchemas';

export const signUp = async (formData: FormData): Promise<ApiAuthResponse> => {
  try {
    const response = await fetch(`${BASE_API_URL}/auth/signup`, {
      method: 'POST',
      body: formData as FormData,
      credentials: 'include',
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data as ApiAuthResponse;
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Unknown error',
    };
  }
};

export const signIn = async (formData: SignInData): Promise<ApiAuthResponse> => {
  try {
    const response = await fetch(`${BASE_API_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: 'include',
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data as ApiAuthResponse;
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Unknown error',
    };
  }
};

export const checkAuth = async (): Promise<ApiAuthResponse> => {
  try {
    const response = await fetch(`${BASE_API_URL}/auth/me`, {
      credentials: 'include',
    });
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data as ApiAuthResponse;
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Auth check failed',
    };
  }
};

export const signout = async (): Promise<ApiAuthResponse> => {
  try {
    const response = await fetch(`${BASE_API_URL}/auth/signout`, {
      method: 'POST',
      credentials: 'include',
    });
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data as ApiAuthResponse;
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Logout failed',
    };
  }
};
