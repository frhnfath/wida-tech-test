import axios from 'axios';

export async function login(username: string, password: string): Promise<string> {
    try {
        const response = await axios.post('http://localhost:3001/api/auth/login', { username, password});
        return response.data.token;
    } catch (error) {
        throw new Error('login failed');
    }
}

export async function register(username: string, email: string, password: string): Promise<string> {
    try {
        const response = await axios.post('http://localhost:3001/api/auth/register', { username, email, password});
        return response.data.token;
    } catch (error) {
        throw new Error('register failed');
    }
}