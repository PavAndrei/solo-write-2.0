import {
  ApiCreateArticleResponse,
  GetAllArticlesApiResponse,
  ToggleArticleLikeApiResponse,
  GetAllArticlesParams,
} from '../types/apiTypes';

export const createArticle = async (formData: FormData): Promise<ApiCreateArticleResponse> => {
  try {
    const res = await fetch(`http://localhost:5000/api/article`, {
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

    return data as ApiCreateArticleResponse;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Network error occured';
    throw new Error(errorMessage);
  }
};

export const getAllArticles = async (
  params?: GetAllArticlesParams
): Promise<GetAllArticlesApiResponse> => {
  const startIndex = params?.startIndex ? `startIndex=${params.startIndex}&` : '';
  const limit = params?.limit ? `limit=${params.limit}&` : '';
  const order = params?.order ? `order=${params.order}&` : '';
  const category = params?.categories ? `category=${params.categories.join(',')}&` : '';
  const searchTerm = params?.searchTerm ? `searchTerm=${params.searchTerm}&` : '';

  try {
    const res = await fetch(
      `http://localhost:5000/api/article${params ? '?' : ''}${startIndex}${limit}${order}${category}${searchTerm}`
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data as GetAllArticlesApiResponse;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Network error occured';
    throw new Error(errorMessage);
  }
};

export const toggleArticleLike = async (id: string): Promise<ToggleArticleLikeApiResponse> => {
  try {
    const res = await fetch(`http://localhost:5000/api/article/${id}/like`, {
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

    return data as ToggleArticleLikeApiResponse;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Network error occured';
    throw new Error(errorMessage);
  }
};
