export const signUp = async (formData) => {
  try {
    const response = await fetch(`http://localhost:5000/api/auth/signup`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const signIn = async (formData) => {
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
    return err;
  }
};
