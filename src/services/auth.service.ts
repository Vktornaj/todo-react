import { Auth, UserLogin, UserRegister } from '../types/endpointTypes';
import authHeader from '../interceptors/authHeader';


const API_URL = 'https://192.168.1.65/';

const api = async <T>(url: string, requestInit: RequestInit): Promise<T> => {
    const response = await fetch(url, requestInit);
    if (!response.ok) {
    throw new Error(response.statusText);
    }
    return await (response.json() as Promise<T>);
}

class AuthService {
  
    postLogin(userLogin: UserLogin) {
        return api<Auth>(
            API_URL + 'auth/login/', 
            { headers: authHeader(), method: 'POST', body: JSON.stringify(userLogin) }
        );
    }

    postRegister(userRegister: UserRegister) {
        return api(
            API_URL + 'auth/register/', 
            { headers: authHeader(), method: 'POST', body: JSON.stringify(userRegister) }
        );
    }
}

export default new AuthService();