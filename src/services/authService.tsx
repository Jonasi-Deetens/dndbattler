import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

interface LoginResponse {
  token: string;
  userData: JSON;
}

interface RegisterResponse {
  token: string;
  userData: JSON;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const register = async ({
  username,
  email,
  password,
  confirmPassword
}: RegisterData): Promise<RegisterResponse> => {
  try {
    const response = await axios.post<RegisterResponse>(
      `${API_URL}/auth/register`,
      { email, password, confirmPassword, username }
    );
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.userData));
    }
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const customError = new Error(
        error.response.data.msg || 'Registration failed'
      );
      throw customError;
    }
    throw error;
  }
};

const login = async ({
  email,
  password
}: LoginData): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, {
      email,
      password
    });
    if (response.data.token) {
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.userData));
    }
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const customError = new Error(error.response.data.msg || 'Login failed');
      throw customError;
    }
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export { register, login, logout };
