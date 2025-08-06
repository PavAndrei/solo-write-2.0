import { CreateCommentApiResponse, GetCommentsApiResponse } from '../types/apiTypes';

type CreateCommentData = {
  content: string;
  articleId: string;
};

export const createComment = async (
  createCommentData: CreateCommentData
): Promise<CreateCommentApiResponse> => {
  try {
    const res = await fetch('http://localhost:5000/api/comment/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createCommentData),
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data as CreateCommentApiResponse;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Network error occured';
    console.error(errorMessage);
    return { success: false, message: errorMessage };
  }
};

export const getArticleComments = async (articleId: string): Promise<GetCommentsApiResponse> => {
  console.log('render comments');
  try {
    const res = await fetch(`http://localhost:5000/api/comment/${articleId}`);

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data as GetCommentsApiResponse;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Network error occured';
    console.error(errorMessage);
    return { success: false, message: errorMessage };
  }
};

export const toggleCommentLike = async (commentId: string) => {
  try {
    const res = await fetch(`http://localhost:5000/api/comment/${commentId}/like`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || res.statusText);
    }

    return data;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Network error occured';
    console.error(errorMessage);
    return { success: false, message: errorMessage };
  }
};
