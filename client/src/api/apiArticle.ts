import { ApiResponse } from './apiAuth';

export const createArticle = async (formData: FormData): Promise<ApiResponse> => {
  try {
    const response = await fetch(`http://localhost:5000/api/article/create`, {
      method: 'POST',
      body: formData as FormData,
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

export const getAllArticles = async (params): Promise<ApiResponse> => {
  try {
    const response = await fetch('http://localhost:5000/api/article/all', {
      method: 'GET',
    });
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Unknown error',
    };
  }
};
