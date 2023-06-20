import { Auth, UserLogin, UserRegister } from '../types/endpointTypes';
import authHeader from '../interceptors/authHeader';


const API_URL = 'https://api.geduardo.com';

const api = async <T>(url: string, requestInit: RequestInit): Promise<T> => {
    const response = await fetch(url, requestInit);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await (response.json() as Promise<T>);
}

class AuthService {
  
    postLogin(userLogin: UserLogin) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", authHeader().Authorization);
        return api<Auth>(
            API_URL + '/api/login', 
            { headers, method: 'POST', body: JSON.stringify(userLogin) }
        );
    }

    postRegister(userRegister: UserRegister) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return api(
            API_URL + '/api/register', 
            { headers, method: 'POST', body: JSON.stringify(userRegister) }
        );
    }
}

export default new AuthService();