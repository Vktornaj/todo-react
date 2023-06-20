import authHeader from '../interceptors/authHeader';
import { User, Todo } from '../types/endpointTypes';


const API_URL = 'https://api.geduardo.com';

const api = async <T>(url: string, requestInit: RequestInit): Promise<T> => {
    const response = await fetch(url, requestInit);
    if (!response.ok) {
    throw new Error(response.statusText);
    }
    return await (response.json() as Promise<T>);
}

class UserService {
  
    getUserInfo(){
        return api<User>(
            API_URL + '/user/info', { headers: authHeader(), method: 'GET' }
        );
    }

    getTodos() {
        return api<Array<Todo>>(
            API_URL + '/users/todo/get/all', { headers: authHeader(), method: 'GET' }
        );
    }
    
    deleteTodo(id: string) {
        return api<string>(
            API_URL + `users/todo/${id}/`, { headers: authHeader(), method: 'DELETE' }
        );
    }
    
    putTodoStatus(status: string, id: string) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", authHeader().Authorization);
        return api(
            API_URL + `/users/todo/${id}`, 
            { headers: authHeader(), method: 'PUT', body: JSON.stringify({ status }) }
        );
    }
    
    postTodo(todo: Todo, id: string) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", authHeader().Authorization);
        return api(
            API_URL + `/users/todo/${id}`, 
            { headers: authHeader(), method: 'POST', body: JSON.stringify(todo) }
        );
    }
}

export default new UserService();