import { AuthEndpoint, UserEndpoint } from '../types/endpointTypes';
import authHeader from '../interceptors/authHeader';
import { adapterEndpointAuth, adapterEndpointUser, adapterEndpointUserLogin, adapterEndpointUserRegister } from '../adapters/user.adapter';
import { UserLogin, UserRegister } from '../types/userTypes';


const API_URL = 'http://127.0.0.1:8000';

const api = async <T>(url: string, requestInit: RequestInit): Promise<T> => {
    const response = await fetch(url, requestInit);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await (response.json() as Promise<T>);
}

class AuthService {
  
    async postLogin(userLogin: UserLogin) {
        let _userLogin = adapterEndpointUserLogin(userLogin);
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", authHeader().Authorization);
        let res = api<AuthEndpoint>(
            API_URL + '/api/login', 
            { headers, method: 'POST', body: JSON.stringify(_userLogin) }
        );
        return adapterEndpointAuth(await res);
    }

    async postRegister(userRegister: UserRegister) {
        let _userRegister = adapterEndpointUserRegister(userRegister);
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let res = api<UserEndpoint>(
            API_URL + '/api/register', 
            { headers, method: 'POST', body: JSON.stringify(_userRegister) }
        );
        return adapterEndpointUser(await res);
    }
    
    getUsernameAvailability(username: string) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return api<{isAvailable: string}>(
            API_URL + `/api/username-availability/${username}`, 
            { headers, method: 'GET' }
        );
    }
}

export default new AuthService();