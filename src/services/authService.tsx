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
    email: string;
    password: string;
    // name: string;
}


const register = async ({ email, password }: RegisterData): Promise<RegisterResponse> => {
    const response = await axios.post<RegisterResponse>(`${API_URL}/auth/register`, { email, password, name:"jonasi" });
    if (response.data.token) localStorage.setItem('token', response.data.token);
    return response.data;
}

const login = async ({ email, password }: LoginData): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, { email, password });
    if (response.data.token) localStorage.setItem('token', response.data.token);
    return response.data;
}

const logout = () => {
    localStorage.removeItem('token');
}

export {
    register,
    login,
    logout
}