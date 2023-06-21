import authHeader from '../interceptors/authHeader';
import { User, Todo, TodoUpdate } from '../types/endpointTypes';


const API_URL = 'https://geduardo.com';

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

    getTodos(from: number, to: number) {
        return api<Array<Todo>>(
            API_URL + `/api/todos/${from}/${to}`, { headers: authHeader(), method: 'GET' }
        );
    }

    deleteTodo(id: string) {
        return api<string>(
            API_URL + `/api/todo/${id}/`, { headers: authHeader(), method: 'DELETE' }
        );
    }
    
    putTodo(todo: TodoUpdate) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", authHeader().Authorization);
        return api(
            API_URL + `/api/todo`,
            { headers, method: 'PUT', body: JSON.stringify(todo) }
        );
    }
    
    postTodo(todo: Todo) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", authHeader().Authorization);
        return api<Todo>(
            API_URL + `/api/todo`, 
            { headers: authHeader(), method: 'POST', body: JSON.stringify(todo) }
        );
    }
}

export default new UserService();