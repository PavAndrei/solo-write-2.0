import { BASE_API_URL } from '../constants/paths';
import { ApiAuthResponse } from '../types/apiTypes';
import { SignInData } from '../utils/authSchemas';

export const signUp = async (formData: FormData): Promise<ApiAuthResponse> => {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/signup`, {
      method: 'POST',
      body: formData as FormData,
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data as ApiAuthResponse;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Network error occured';
    throw new Error(errorMessage);
  }
};

export const signIn = async (formData: SignInData): Promise<ApiAuthResponse> => {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data as ApiAuthResponse;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Network error occured';
    throw new Error(errorMessage);
  }
};

export const checkAuth = async (): Promise<ApiAuthResponse> => {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/me`, {
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data as ApiAuthResponse;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Network error occured';
    throw new Error(errorMessage);
  }
};

export const signout = async (): Promise<ApiAuthResponse> => {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/signout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data as ApiAuthResponse;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Network error occured';
    throw new Error(errorMessage);
  }
};
