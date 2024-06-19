import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

interface LoginResponse {
  token: string;
}

interface RegisterResponse {
  token: string;
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
    if (response.data.token) localStorage.setItem('token', response.data.token);
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
    if (response.data.token) localStorage.setItem('token', response.data.token);
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
};

export { register, login, logout };
