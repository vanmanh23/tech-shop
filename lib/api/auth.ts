interface SignInData {
  email: string;
  password: string;
}

interface SignUpData {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
  role?: number;
}

export async function signIn(data: SignInData) {
  try {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to sign in');
    }

    const result = await response.json();
    
    // Lưu token vào localStorage
    if (result.token) {
      localStorage.setItem('token', result.token);
    }

    return result;
  } catch (error) {
    throw error;
  }
}

// Hàm helper để lấy token từ localStorage
export function getAuthToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

// Hàm helper để thêm token vào headers
export function getAuthHeaders() {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function signOut() {
  localStorage.removeItem('access_token');
  window.location.href = '/';
}

export async function signUp(data: SignUpData) {
  try {
    console.log("data222222222: ", data);
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        name: data.name,
        confirmPassword: data.confirmPassword,
        role: data.role || 1 // Default role is 1 (user)
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to sign up');
    }

    const result = await response.json();
    
    // Lưu token vào localStorage nếu có
    // if (result.token) {
    //   localStorage.setItem('token', result.token);
    // }

    return result;
  } catch (error) {
    throw error;
  }
}
