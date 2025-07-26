import { ApiResponse } from './apiAuth';

export const createArticle = async (formData: FormData): Promise<ApiResponse> => {
  try {
    const response = await fetch(`http://localhost:5000/api/article`, {
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

type getAllArticlesParams = {
  startIndex?: string;
  limit?: string;
  order?: string;
  userId?: string;
  category?: string;
  searchTerm?: string;
};

export const getAllArticles = async (params?: getAllArticlesParams): Promise => {
  const startIndex = params?.startIndex ? `startIndex=${params.startIndex}` : '';
  const limit = params?.limit ? `limit=${params.limit}` : '';
  const order = params?.order ? `order=${params.order}` : '';
  const userId = params?.userId ? `userId=${params.userId}` : '';
  const category = params?.category ? `category=${params.category}` : '';
  const searchTerm = params?.searchTerm ? `searchTerm=${params.searchTerm}` : '';

  try {
    const res = await fetch(
      `http://localhost:5000/api/article${params ? '?' : ''}${startIndex}${limit}${order}${userId}${category}${searchTerm}`
    );

    const data = await res.json();
    return data;
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Unknown error',
    };
  }
};

export const toggleArticleLike = async (id: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`http://localhost:5000/api/article/${id}/like`, {
      method: 'POST',
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
